<template>
    <div>
        <div class="user">
            <div class="user_cont">
                <div class="user_cont_wrap">
                    <div class="first_table">
                        <div class="search">
                            <input type="text" v-model="query" placeholder="Поиск">
                            <div class="btn_block">
                                <div class="add_input_btn">
                                    <div class="search_btn" @click="getSearchlist"><i class="far fa-search"></i> Поиск
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table_block" @scroll="checkScr" ref="scladScr">
                            <table class="table">
                                <thead class="table_head">
                                <tr class="table_row">
                                    <th class="table_data">Наименованние</th>
                                    <th class="table_data">Номер</th>
                                    <th class="table_data">Цена</th>
                                    <th class="table_data">Добавить</th>
                                </tr>
                                <tr class="table_row" v-for="(i , index) in $store.state.items" :key="index">
                                    <td class="table_data">{{i.name}}</td>
                                    <td class="table_data">{{i.id}}</td>
                                    <td class="table_data">{{i.price}}</td>
                                    <td class="table_data">
                                        <button @click="addInBasket(index)" class="table_data_btn"><i
                                                class="fas fa-plus"></i> Добавить
                                        </button>
                                    </td>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="second_table">
                        <div class="heading">
                            <div class="title_head ">
                                Корзина
                            </div>
                            <div class="heading_btn">
                                <button class="title_head_btn" @click="showClean=true">Очистить</button>
                            </div>
                        </div>
                        <div class="сheck">
                            <table class="сheck_table">
                                <thead class="сheck_table_head">
                                <tr class="check_table_row">
                                    <th class="сheck_table_data">Скидка</th>
                                    <th class="сheck_table_data">Наименованние</th>
                                    <th class="сheck_table_data">Цена</th>
                                    <th class="сheck_table_data">Удалить</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="сheck_table_row" v-for="(item , index) in $store.state.basket" :key="index">
                                    <td class="сheck_table_data" @click="showModal=true">
                                        <button class="table_data_btn"><i class="fas fa-percent"></i></button>
                                    </td>
                                    <td class="сheck_table_data">{{item.name}}</td>
                                    <td class="сheck_table_data">{{item.price}}</td>
                                    <td class="сheck_table_data">
                                        <button @click="remFromBasket(index)" class="title_head_btn"><i
                                                class="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="outcast">
                            <div class="outcast_head">
                                <div class="text">
                                    <span>Итог</span>:<span>{{sum}}</span>
                                </div>
                                <div class="сheck_give" @click="showCheck=true">
                                    <button class="check_btn">Счет</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <transition name="modal" v-show="showModal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            <div>
                                Выберите скидку
                            </div>
                        </slot>
                        <slot name="close">
                            <div style="margin-left: auto">
                                <button class="modal-btn" @click="showModal=false"><i class="fas fa-times"></i>
                                </button>
                            </div>
                        </slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <div class="body">
                                <div class="body_btn">
                                    <button class="btnm red">Б</button>
                                    <button class="btnm yellow">С</button>
                                    <button class="btnm green">М</button>
                                </div>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <transition name="modal" v-show="showCheck">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            <div>
                                Закрыть счет
                            </div>
                        </slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <div class="body">
                                <div class="body_btn">
                                    <button class="btnm green">Да</button>
                                    <button class="btnm red" @click="showChek=false">Отмена</button>
                                </div>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <transition name="modal" v-show="showClean">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            <div>
                                Очистить корзину
                            </div>
                        </slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <div class="body">
                                <div class="body_btn">
                                    <button @click="emptyBasket" class="btnm green">Да</button>
                                    <button class="btnm red" @click="showClean=false">Отмена</button>
                                </div>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "User",
        data() {
            return {
                showModal: false,
                showCheck: false,
                showClean: false,
                query: "",
            }


        },
        watch: {
            query(param) {
                this.$store.state.query = param;
                this.$store.state.itemListOffset = 0;
                this.getSearchlist()
            },

        },
        methods: {
            getItemsData() {
                if (this.$store.state.items.length === 1) {
                    this.$store.dispatch('getItems');
                }
            },
            getSearchlist() {
                this.$store.state.items = [];

                this.$store.dispatch('getItems');
            },
            checkScr() {
                this.scr = this.$refs.scladScr.scrollHeight <= this.$refs.scladScr.scrollTop + this.$refs.scladScr.offsetHeight + 140;
                if (this.scr) {
                    if (this.fetchTimeout) clearTimeout(this.fetchTimeout);
                    this.fetchTimeout = setTimeout(() => {
                        this.$store.dispatch('getItems');
                    }, 500);
                }
            },
            addInBasket(index) {
                this.$store.commit('addToBasket', index)
            },
            remFromBasket(index) {
                this.$store.commit('removeFromBasket', index)
            },
            emptyBasket() {
                this.$store.commit('removeBasket')
                this.showClean = false

            }
        },
        created() {
            this.getItemsData();
        },
        computed: {
            ...mapGetters({
                sum:"overPrice",
            })
        }
    }
</script>

<style lang="scss" scoped>

    .user {
        &_cont {
            margin-top: 20px;
            margin-left: auto;
            margin-right: auto;

            &_wrap {
                display: flex;
                justify-content: center;
            }
        }
    }

    .table_block {
        margin-top: 20px;
        height: 450px;
        overflow-y: scroll;
        border: 2px solid #4B1CD1;
    }

    .table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;

        &_row {

        }

        &_data {
            border: 1px solid;
            height: 40px;

            &:last-child {
                border: none;
            }

            &_btn {
                padding: 8px 10px;
                margin: 2px;
                background: linear-gradient(180deg, #4B1CD1 0%, rgba(25, 6, 79, 0.65) 100%);
                border: none;
                border-radius: 15px;
                color: white;
                outline: none;
                cursor: pointer;

                &:hover {
                    background: linear-gradient(0deg, #a791ed 0%, #6a00ff 100%);
                }
            }
        }
    }

    .search {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        & input {
            border-radius: 10px;
            height: 30px;
            width: 250px;
            padding: 3px 20px;
            font-size: 20px;
            outline: none;
            border: 1px solid grey;

            &::placeholder {
                font-size: 20px;
            }
        }

        &_btn {
            padding: 12px 20px;
            width: 65px;
            border-radius: 10px;
            margin-left: 15px;
            color: white;
            background: linear-gradient(180deg, #4B3DA0 0%, rgba(31, 106, 175, 0.8) 100%);
            font-size: 15px;
            outline: none;
            cursor: pointer;

            &:hover {
                background: linear-gradient(0deg, #a791ed 0%, #6a00ff 100%);
            }
        }
    }

    .title_head {
        font-size: 30px;
        font-family: sans-serif;
    }

    .heading {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;

        &_btn {
            margin-left: auto;
            cursor: pointer;
        }
    }

    .title_head_btn {
        border: none;
        background: linear-gradient(0deg, rgba(255, 0, 0, 1) 0%, rgba(147, 0, 62, 1) 100%);
        padding: 10px 20px;
        border-radius: 20px;
        outline: none;
        transition: all 0.4s ease-in-out;
        color: white;
        cursor: pointer;

        &:hover {
            background: linear-gradient(0deg, rgba(255, 0, 108, 1) 0%, rgba(255, 145, 0, 1) 100%);
        }
    }

    .first_table {
        margin-right: 30px;

    }

    .сheck {
        margin-top: 27px;
        height: 450px;
        overflow-y: scroll;
        width: 450px;
        border: 2px solid #4B1CD1;

        &_table {

            width: 100%;
            text-align: center;
            border-collapse: collapse;

            &_row {

            }

            &_data {
                border: 1px solid;
                height: 40px;
            }
        }
    }

    .outcast_head {
        display: flex;
        margin-top: 20px;
        align-items: center;
    }

    .text {
        margin-right: auto;
        font-size: 30px;
        font-family: sans-serif;
    }

    .сheck_give {
        font-family: sans-serif;
        font-size: 20px;
    }

    .check_btn {
        padding: 12px 30px;
        border-radius: 10px;
        margin-left: 15px;
        color: white;
        background: linear-gradient(180deg, #4B3DA0 0%, rgba(31, 106, 175, 0.8) 100%);
        font-size: 15px;
        outline: none;
        border: none;
        cursor: pointer;

        &:hover {
            background: linear-gradient(0deg, #a791ed 0%, #6a00ff 100%);
        }
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
        font-family: sans-serif;
    }

    .modal-wrapper {

        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        font-family: Helvetica, Arial, sans-serif;

    }

    .modal-header {
        display: flex;
    }

    .modal-header {
        margin-top: 0;

    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-btn {
        color: white;
        background: #dc3545;
        outline: none;
        border: none;
        font-size: 20px;

        &:hover {
            background: #c82333;
        }
    }

    .modal-default-button {
        float: right;
    }

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    .body_btn {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btnm {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: 15px 30px;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: .25rem;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        margin-right: 20px;
        outline: none;
    }

    .red {
        background: #dc3545;

        &:hover {
            background: #c82333;
        }
    }

    .yellow {
        background: #ffc107;

        &:hover {
            background: #e0a800;
        }
    }

    .green {
        background: #28a745;

        &:hover {
            background: #218838;
        }
    }
</style>