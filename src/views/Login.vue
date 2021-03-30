<template>
    <div id="login">
        <div class="login background">
            <div class="login_wrap">
                <div class="row">
                    <div class="login__column" style="border: 1px solid #0069d9;">
                        <div class="form__container">
                            <form @submit.prevent="postLogin">
                                <div class="form__input">
                                    <input type="text" name="username" v-model="form.username" placeholder="Введите имя">
                                </div>

                                <div class="form__input">
                                    <input type="password" name="password" v-model="form.password" placeholder="Введите пороль" >
                                </div>
                                <div style="text-align: center">
                                    <input type="submit" class="login__button" value="Войти">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
          return{
            form:{
                username:'',
                password:'',
            }
          }
        },
        methods:{
            postLogin(){
               this.$store.dispatch("postAdmin", this.form)
                this.$router.push({name: "User"})
            }
        },

    }
</script>

<style lang="scss" scoped>

    .background{
        height: 100vh;
    }
    .login {
        &_wrap {
            width: 1200px;
            margin: 0 auto;
        }

        &_row {
            display: flex;
            align-items: center;
            padding: 60px 0;
            justify-content: center;
        }
    }

    .row {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login__column {
        padding: 40px 50px;
        border-radius: 20px;
        width: 300px;
        margin-top: 150px;
    }

    .form__container {

    }

    .login__column .form__input input {
        width: 90%;
        border-radius: 40px;
        border: 1px solid #ccc;
        padding: 10px 15px;
        outline: none;
        margin: 10px auto;
    }

    .form__input {

    }

    .email__input i {
        position: absolute;
        left: 10px;
        top: 20px;
        filter: invert(50%);
    }

    .password__input {
        position: relative;
        margin-top: 20px;
    }

    .rememberMe__row {
        justify-content: space-between;
        margin-left: 25px;
    }

    .login__button {
        outline: none;
        border: 1px solid #0069d9;
        background: #007bff;
        color: #ffffff;
        width: 50%;
        padding: 10px;
        border-radius: 40px;
        margin: 0 auto;
        &:hover{
            background: #0069d9;
        }
    }


</style>