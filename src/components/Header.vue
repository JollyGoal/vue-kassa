<template>
    <header id="header">
        <div class="header">
            <div class="header_wrap">
                <div class="header_wrap_cont_s">
                    <router-link style="text-decoration: none" to="/">
                        <div class="logo">
                            <img src="../assets/logo.png" alt="">
                        </div>
                    </router-link>
                    <div class="header_wrap_cont_btn_d">
                        <router-link style="text-decoration: none" to="/">
                            <div class="btn_exit"><i class="fas fa-sign-out-alt"></i></div>
                        </router-link>
                    </div>
                </div>
                <div class="header_wrap_cont">
                    <div class="header_wrap_cont_btn">
                        <router-link style="text-decoration: none" to="/Sclad">
                            <div class="btn">Cклад</div>
                        </router-link>
                    </div>
                    <div class="header_wrap_cont_btn">
                        <router-link style="text-decoration: none" to="/static">
                            <div class="btn">Статистика</div>
                        </router-link>
                    </div>
                    <div class="header_wrap_cont_btn">
                        <router-link style="text-decoration: none" to="/exp">
                            <div class="btn">Расходы</div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header",
        props: {},
        data(){
            return{

            }
        },
        method:{

        },
    }
</script>

<style lang="scss" scoped>
    .logo {
        width: 80px;
        height: 80px;

        & img {
            width: 100%;
            height: 100%;
        }
    }


    .header {
        font-family: sans-serif;

        &_wrap {
            display: flex;

            .header_wrap_cont {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                margin-right: 116px;

                &_s {
                    display: flex;
                    justify-content: flex-start;
                }

                &_btn {
                    margin-right: 15px;

                    .btn {
                        background: linear-gradient(180deg, #4B3DA0 0%, rgba(31, 106, 175, 0.85) 100%);
                        appearance: auto;
                        margin-right: 20px;
                        text-rendering: auto;
                        color: white;
                        letter-spacing: normal;
                        word-spacing: normal;
                        display: inline-block;
                        text-align: center;
                        align-items: flex-start;
                        cursor: pointer;
                        width: 200px;
                        border-radius: 15px;
                        padding-top: 20px;
                        padding-bottom: 20px;
                        font-size: 30px;
                        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                        transition: all 0.4s ease-in;

                        &:hover {
                            background: linear-gradient(0deg, rgba(167, 145, 237, 1) 0%, rgba(106, 0, 255, 1) 100%);
                        }
                    }
                }
            }
        }
    }

    .header_wrap_cont_btn_d {
        align-self: center;
        margin-right: 10px;
        width: 80px;
    }

    .btn_exit {
        margin-left: 10px;
        appearance: auto;
        text-rendering: auto;
        color: black;
        letter-spacing: normal;
        word-spacing: normal;
        display: inline-block;
        text-align: center;
        align-items: flex-start;
        cursor: pointer;
        border-radius: 15px;
        font-size: 40px;
        transition: all 0.4s ease-in;

        &:hover {
            transform: scale(1.2);
        }
    }
</style>