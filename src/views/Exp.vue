<template>
    <div id="exp">
        <div class="exp">
            <div class="exp_wrap">
                <div class="exp_wrap_row">
                    <div class="title">
                        <h1 style="font-family: sans-serif">
                            Расходы
                        </h1>
                    </div>
                    <div class="exp_list_sum">
                        <form class="exp_list_block" @submit.prevent="postOutcome">
                            <input class="exp_list_input" type="text" name="name" id="name" v-model="form.name"
                                   placeholder="Название расхода">
                            <input class="exp_list_input" type="number" name="sum" id="sum" v-model="form.sum"
                                   min="0" placeholder="Введите сумму расхода">
                            <div class="exp_list_buttons">
                                <input class="exp_list_buttons_btn" type="submit" value="Добавить">
                            </div>
                        </form>
                    </div>
                    <div class="exp_list">
                        <div class="table">
                            <div class="table_block">
                                <table class="table">
                                    <tr class="table_row">
                                        <th class="table_data">Наименовая</th>
                                        <th class="table_data">Номер</th>
                                        <th class="table_data">Сумма</th>
                                        <th class="table_data">Дата</th>
                                        <th class="table_data">Удалить</th>
                                    </tr>

                                    <transition-group appear name="listfade">
                                        <tr class="table_row" v-for="(item, index) in $store.state.outcome" :key="index">
                                            <td class="table_data">{{item.name}}</td>
                                            <td class="table_data">{{item.id}}</td>
                                            <td class="table_data">{{item.sum}}</td>
                                            <td class="table_data">
                                                {{ ("0" + new Date(item.pub_date).getDate()).substr(-2)}}.{{new
                                                Date(item.pub_date).getMonth()+1 }}.{{ new Date(item.pub_date).getFullYear()}}
                                                {{new Date(item.pub_date).getHours()}}:{{(":"+"0"+new
                                                Date(item.pub_date).getMinutes()).substr(-2)}}
                                            </td>
                                            <td class="table_data">
                                                <button class="exp_list_buttons_rem" ><i
                                                        class="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </transition-group>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Exp",
        data() {
            return {
                form: {
                    type: "OUTCOME"
                },

            }
        },
        methods: {
            postOutcome() {
                this.$store.dispatch('postOutcome', this.form);
                console.log(this.form)
                return false;

            },
            getOutcome() {
                if (this.$store.state.outcome.length === 0) {
                    this.$store.dispatch('getOutcome');
                }
            },

        },
        // computed: {
        //     outcomeList () {
        //         return this.$store.state.outcome
        //     }
        // },
        created() {
            this.getOutcome();
        }
    }
</script>

<style scoped lang="scss">

    ::-webkit-scrollbar {
        width: 8px;
        height: 5px;
    }

    ::-webkit-scrollbar-track-piece {
        margin: 18px 5px
    }

    ::-webkit-scrollbar-thumb:vertical {
        height: 5px;
        background: #DCDCDC;
        border-radius: 40px;
    }

    .exp_list {
        display: flex;

        &_sum {
            align-self: center;
            margin-right: 20px;
        }

        &_block {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }

        &_input {
            border-radius: 10px;
            height: 30px;
            width: 250px;
            padding: 3px 15px;
            font-size: 20px;
            outline: none;
            border: 1px grey solid;
            margin-right: 15px;
        }

        &_buttons {
            display: flex;
            align-items: center;

            &_btn {

                margin-left: 20px;
                margin-right: 20px;
                padding: 8px 20px;
                border-radius: 10px;
                color: white;
                background: linear-gradient(180deg, #4B1CD1 0%, rgba(25, 6, 79, 0.65) 100%);
                font-size: 20px;
                outline: none;
                cursor: pointer;
                border: none;

                &:hover {
                    background: #0062cc;
                }


            }

            &_rem {
                background: #dc3545;
                margin-right: 20px;
                padding: 12px 20px;
                border-radius: 10px;
                color: white;
                font-size: 15px;
                outline: none;
                cursor: pointer;
                border: none;

                &:hover {
                    background: #c82333;
                }
            }
        }
    }

    .exp_select {
        width: 500px;
        padding: 20px 10px;
        outline: none;
        height: 400px;
        font-size: 30px;
        text-align: center;

        &_block {
            margin-right: 10px;
        }
    }

    .table_block {
        width: 100%;
        height: 400px;
        font-family: sans-serif;
    }

    .table {
        width: 100%;
        border-collapse: collapse;
        overflow-y: scroll;

        &_row:nth-child(even) {
            background-color: #dddddd;
        }

        &_data {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            width: 150px;
        }
    }
    .listfade-enter-from,
    .listfade-leave-to {
        transform: translateY(50%);
        opacity: 0;
    }

    .listfade-move {
        position: absolute;
        transition: all 1s ease;
    }

</style>