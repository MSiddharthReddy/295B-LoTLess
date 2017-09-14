<style lang="">
    #foo {
        border: 1px solid blue;
    }
</style>

<template>
    <div>
        <div id="foo">
            <h1> {{msg}} </h1>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'fotter-view',
        data() {
            return {
                msg: 'Footer bottom'
            }
        }
    }
</script>