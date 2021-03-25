<template>
    <div>
        <div id="sclad">
            <div class="sklad">
                <div class="sklad_wrap">
                    <div class="sklad_title">
                    <span>
                        Поиск товара
                    </span>
                    </div>
                    <div class="creative">
                        <div class="search">
                            <input type="text" placeholder="Поиск" v-model="query">
                            <div class="btn_block">
                                <div class="add_input_btn">
                                    <div class="search_btn" @click="getSearchData"><i class="far fa-search"></i> Поиск
                                    </div>
                                </div>
                                <div class="add">
                                    <div class="add_input_btn" @click="showModal=true">
                                        <div class="add_input_btn">
                                            <div class="add_btn"><i class="fas fa-plus"></i>
                                                <span> Добавить товар</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="add">
                    <div class="add_title">
                        Добавление товара
                    </div>
                    <div class="wrap">
                        <div class="table_cont">
                            <table class="table">
                                <thead>
                                <tr class="table_row fix">
                                    <th class="table_data br">Номер</th>
                                    <th class="table_data">Наименование</th>
                                    <th class="table_data">Цена</th>
                                    <th class="table_data">Количество</th>
                                    <th class="table_data">Изменить</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="table_row" v-for="(item, index) in $store.state.items" :key="index">
                                    <td class="table_data">{{item.id}}</td>
                                    <td class="table_data">{{item.name}}</td>
                                    <td class="table_data">{{item.price}}</td>
                                    <td class="table_data">{{item.count}}</td>
                                    <td class="table_data">
                                        <button class="change"><i class="fas fa-pencil-alt"></i></button>
                                    </td>
                                    <!-- <td class="table_data">
                                         <button class="remove"><i class="fas fa-trash-alt"></i></button>
                                     </td>-->
                                </tr>
                                </tbody>
                            </table>
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
                                Заполните поля
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
                            <form>
                                <div class="input_add" id="vue">
                                    <input type="text" name="name" id="name" placeholder="Введите название"
                                           v-model="form.name">
                                    <input type="text" v-model="form.price"
                                           @blur="focusOut" @focus="focusIn" name="price" id="price"
                                           placeholder="Введите Цену">
                                </div>
                                <div class="input_add">
                                    <input type="number" min="0" name="count" id="count"
                                           v-model="form.count" placeholder="Введите колличество">
                                    <input type="number" min="0" name="percent" id="percent"
                                           placeholder="Введите процент наценки" v-model="form.percent">
                                </div>
                                <div class="input_add">
                                    <input type="file" ref="file" name="file" id="file">
                                    <input type="number" min="0"  name="min_percent" id="min_percent"
                                           v-model="form.min_percent"
                                           placeholder="Введите минимальную наценку">
                                </div>

                                <div class="input_add">
                                    <textarea type="text" class="textarea" name="desc" id="desc"
                                              placeholder="Введите описание" v-model="form.desc"></textarea>
                                </div>
                                <div style="margin-left: auto">
                                    <button class="modal-send-btn" @click="postItem">+ Добавить</button>
                                </div>
                            </form>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>

    export default {
        name: "Sclad",
        data() {
            return {
                showModal: false,
                currencyValue: '',
                formattedCurrencyValue: "",
                query: "",
                formData: "",
                form: {
                    name: "",
                    price: "",
                    count: "",
                    percent: "",
                    file: '',
                    min_percent: "",
                    desc: "",
                },
            }
        },
        watch: {
            query(param) {
                this.$store.state.query = param;
                this.getSearchData()
            }
        },
        methods: {
            focusOut() {
                this.currencyValue = parseFloat(this.formattedCurrencyValue.replace(/[^\d.]/g, ""));
                // Ensure that it is not NaN. If so, initialize it to zero.
                // This happens if user provides a blank input or non-numeric input like "abc"
                if (isNaN(this.currencyValue)) {
                    this.currencyValue = 0
                }
                // Format display value based on calculated currencyValue
                this.formattedCurrencyValue = this.currencyValue.toFixed().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
            },
            focusIn() {
                // Unformat display value before user starts modifying it
                this.formattedCurrencyValue = this.currencyValue.toString()
            },
            getItemData() {
                if (this.$store.state.items.length === 0) {
                    this.$store.dispatch('getItems');
                    console.log(this.$store.state.items)
                }
            },
            getSearchData() {
                this.$store.dispatch('getItems');
            },

        },
        created() {
            this.getItemData();
        }
    }
</script>

<style lang="scss" scoped>
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

    .sklad {
        &_wrap {
            margin-top: 20px;
        }

        &_title {
            font-size: 40px;
            font-family: sans-serif;
        }
    }

    .search {
        display: flex;
        flex-direction: row;
        width: 100%;

        & input {
            border-radius: 10px;
            height: 30px;
            width: 250px;
            padding: 3px 20px;
            font-size: 20px;
            outline: none;

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

    .remove {
        border-radius: 5px;
        padding: 5px 10px;
        background: #dc3545;
        border: none;
        outline: none;
        color: white;

        &:hover {
            background: #c82333;
        }
    }

    .add_input_btn {
        width: 120px;
        margin-right: 25px;
    }

    .help_text {
        font-size: 16px;
        margin-top: 0;
        color: gray;
        padding: 0 40px;
    }

    .creative {
        display: flex;
        flex-direction: row;
    }

    .btn_block {
        display: flex;
        width: 100%;
    }

    .add {
        padding: 0 40px;
        margin-left: auto;

        &_input_name {
            margin-bottom: 20px;

            & input {
                border-radius: 10px;
                height: 30px;
                padding: 3px 20px;
                width: 250px;
                font-size: 20px;
                outline: none;
            }
        }

        &_btn {
            width: 120px;
            padding: 12px 20px;
            border-radius: 10px;
            color: white;
            background: linear-gradient(180deg, #4B1CD1 0%, rgba(25, 6, 79, 0.65) 100%);
            font-size: 15px;
            outline: none;
            cursor: pointer;

            &:hover {
                background: linear-gradient(0deg, #a791ed 0%, #6a00ff 100%);
            }
        }
    }


    .search_result {
        display: flex;
        justify-content: space-around;
        font-size: 30px;
    }

    .add {
        padding: 0 40px;

        &_btn {
            background: none;
            padding: 12px 20px;
            border-radius: 10px;
            color: white;
            background: #007bff;
            font-size: 15px;
            outline: none;
            cursor: pointer;
            margin-right: 30px;

            &:hover {
                background: #0069d9;
            }
        }
    }


    .add_title {
        font-size: 30px;
        font-family: sans-serif;
        margin: 20px 0;
    }


    .wrap {
        display: flex;
    }


    .table_cont {
        overflow-y: scroll;
        width: 100%;
        height: 550px;
        border-radius: 25px;
    }

    .br:first-child {
        border-top-left-radius: 25px;

    }

    .br:last-child {
        border-top-right-radius: 20px;
    }

    .fix {
        width: 100%;
        position: sticky;
        height: 65px;
        border-radius: 20px;

    }

    .btn_mod {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &_mb {
            width: 19px;
            padding: 25px 38px 25px 34px;
            border-radius: 50%;
            color: white;
            background: linear-gradient(180deg, #4B1CD1 0%, rgba(25, 6, 79, 0.65) 100%);
            font-size: 30px;
            outline: none;
            cursor: pointer;
            margin-right: 20px;
        }

        &_text {
            font-size: 30px;
            font-family: sans-serif;
        }
    }

    .table {
        border-collapse: collapse;
        position: relative;
        width: 100%;


        &_row:nth-child(even) {
            background-color: #dddddd;
        }

        &_data {
            border: 1px solid #dddddd;
            text-align: center;
            padding: 8px;

            & img {
                width: 50px;
                height: 50px;
            }
        }

        &:last-child {
            width: 100%;
        }
    }

    .table:first-child .table_row {
        border-radius: 20px;
    }

    th {
        position: sticky;
        top: 0;
        box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
        background: #E9E2E2;
    }


    .input_add {
        margin-bottom: 20px;
        margin-left: 20px;
        display: flex;

        & input {
            margin-right: 10px;
            width: 100%;
            padding: 10px 15px;
            border-radius: 10px;
            border: 1px solid gray;
            outline: none;
        }
    }

    .change {
        padding: 12px 15px;
        color: white;
        font-size: 25px;
        background: #007bff;
        outline: none;
        border-radius: 30px;
        border: none;

        &:hover {
            background: #0069d9;
        }

    }

    .remove {
        background: #dc3545;
        padding: 12px 15px;
        color: white;
        font-size: 25px;
        outline: none;
        border-radius: 30px;
        border: none;

        &:hover {
            background: #c82333;
        }
    }


    /* MODAL CSS */
    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-send-btn {
        display: inline-block;

        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: .25rem;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        color: #fff;
        background-color: #28a745;
        outline: none;

        &:hover {
            color: #fff;
            background-color: #218838;
            border-color: #1e7e34;
        }
    }

    .modal-btn {
        color: white;
        background: #dc3545;
        outline: none;

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

    .textarea {
        resize: none;
        width: 88%;
        height: 150px;
        font-size: 20px;
        padding: 20px;
        border-radius: 20px;
        outline: none;
    }

    /* MODAL CSS */
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
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 500px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        font-family: Helvetica, Arial, sans-serif;
        height: 500px;
    }

    .modal-header {
        display: flex;
    }


</style>
