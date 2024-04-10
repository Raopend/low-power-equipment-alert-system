<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import menuAside from '@/components/MenuAside/menuAside.js'
import {useDarkModeStore} from '@/stores/darkMode.js'
import AsideMenu from "@/components/MenuAside/AsideMenu.vue";
import FooterBar from "@/components/Base/FooterBar.vue";
import NavBar from "@/components/NavBar/NavBar.vue";
import NavBarItemPlain from "@/components/NavBar/NavBarItemPlain.vue";
import BaseIcon from "@/components/Base/BaseIcon.vue";
import {mdiBackburger, mdiForwardburger, mdiMenu} from "@mdi/js";
import menuNavBar from "@/components/NavBar/menuNavBar.js";

const layoutAsidePadding = 'xl:pl-60'

const darkModeStore = useDarkModeStore()

const router = useRouter()

const isAsideMobileExpanded = ref(false)
const isAsideLgActive = ref(false)

router.beforeEach(() => {
    isAsideMobileExpanded.value = false
    isAsideLgActive.value = false
})

const menuClick = (event, item) => {
    if (item.isToggleLightDark) {
        darkModeStore.set()
    }
}
</script>

<template>
    <div
        :class="{
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded
    }"
    >
        <div
            :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
            class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
        >
            <nav-bar
                :menu="menuNavBar"
                :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
                @menu-click="menuClick"
            >
                <nav-bar-item-plain
                    display="flex lg:hidden"
                    @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
                >
                    <base-icon :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger" size="24"/>
                </nav-bar-item-plain>
                <nav-bar-item-plain display="hidden lg:flex xl:hidden" @click.prevent="isAsideLgActive = true">
                    <base-icon :path="mdiMenu" size="24"/>
                </nav-bar-item-plain>
            </nav-bar>
            <AsideMenu
                :is-aside-mobile-expanded="isAsideMobileExpanded"
                :is-aside-lg-active="isAsideLgActive"
                :menu="menuAside"
                @menu-click="menuClick"
                @aside-lg-close-click="isAsideLgActive = false"
            />
            <slot/>
            <FooterBar>
            </FooterBar>
        </div>
    </div>
</template>
