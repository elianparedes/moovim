<template>
    <div class="d-flex flex-column" style="height:100vh;">
        <div class="ma-auto">
            <v-img class="my-8" src="/moovim.svg" width="35%" style="translate:-8px 0px;">

            </v-img>
            <h1 style="font-size:200px; line-height: 12rem;">
                404
            </h1>
            <h1>
                Ups... la página que buscaba no existe.
            </h1>
            <h3>
                Es posible que haya escrito mal la dirección o que la página se haya modificado.
            </h3>
            <div class="mt-12">
                <v-btn rounded depressed large color="red" elevation="0" @click="onClick()">
                    Volver a inicio
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        onClick() {
            this.$router.push({ name: 'home' });
        }
    }
}

</script>