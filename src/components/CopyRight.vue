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
    color: var(--secondary);
    margin: var(--space-xl) 0;
    font-size: var(--font--1);
    font-weight: 700;
    text-align: center;
    z-index: 10;

    a {
        color: var(--primary-light);

        &:hover {
            color: var(--primary);
        }
    }
}
</style>