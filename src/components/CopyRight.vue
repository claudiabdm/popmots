<template>
    <p class="copyright">
        ©PopMots 2024 made with ✨ by
        <a
            href="https://www.claudiabdm.com/"
            target="_blank"
            rel="noopener noreferrer"
        >
            claudiabdm
        </a>
    </p>
</template>

<style lang="scss">
.copyright {
    width: 100%;
    height: 50px;
    color: var(--secondary);
    margin: 0;
    font-size: var(--font--1);
    font-weight: 400;
    text-align: center;
    z-index: 10;

    a {

        &:hover {
            color: var(--primary);
        }
    }
}
</style>