<template>
    <div class="add">
        <div class="add_title">
            Добавление товара
        </div>
        <div class="wrap">
            <div class="table_cont">
                <table class="table">
                    <tr class="table_row">
                        <th class="table_data">Наименовая</th>
                        <th class="table_data">Цена</th>
                        <th class="table_data">Колличество</th>
                        <th class="table_data">Процент наценки</th>
                        <th class="table_data">Изображение</th>
                        <th class="table_data">Минимальная цена</th>
                        <th class="table_data">Описание</th>
                    </tr>
                    <tr class="table_row">
                        <td class="table_data"></td>
                        <td class="table_data"></td>
                        <td class="table_data"></td>
                        <td class="table_data"></td>
                        <td class="table_data"><img alt=""></td>
                        <td class="table_data"></td>
                        <td class="table_data"></td>
                    </tr>
                </table>
            </div>
        </div>
        <div>
            <div class="add_input_btn">
                <div class="add_btn" @click="showModal=true"><i class="fas fa-plus"></i> Добавить товар</div>
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
                                <div >
                                    <div class="input_add" id="vue">
                                        <input type="text" name="name" id="name" placeholder="Введите название">
                                        <input type="text" inputmode="decimal" v-model="number" name="price" id="price" placeholder="Введите Цена">
                                    </div>
                                    <div class="input_add">
                                        <input type="number" name="count" id="count" placeholder="Введите колличество">
                                        <input type="number" name="percent" id="percent"
                                               placeholder="Введите процент наценки">
                                    </div>
                                    <div class="input_add">
                                        <input type="file" name="img" id="img">
                                        <input type="number" name="minValue" id="minValue"
                                               placeholder="Введите минимальную наценку">
                                    </div>

                                    <div class="input_add">
                                        <textarea type="text" class="textarea" name="disc" id="disc"
                                                  placeholder="Введите описание"></textarea>
                                    </div>
                                    <div style="margin-left: auto">
                                        <button class="modal-send-btn">+ Добавить</button>
                                    </div>
                                </div>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {

        name: "Add",

        data() {
            return {
                showModal: false,
            }
        },

    }
</script>

<style scoped lang="scss">
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
        border-color: #28a745;
        outline: none;
        &:hover{
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
    }

    .wrap {
        display: flex;
    }

    .add {
        padding: 0 40px;

        &_btn {
            background: none;
            width: 120px;
            padding: 12px 20px;
            border-radius: 10px;
            color: white;
            background: #007bff;
            font-size: 15px;
            outline: none;
            cursor: pointer;

            &:hover {
                background: #0069d9;
            }
        }
    }

    .table_cont {
        overflow-y: scroll;
        width: 100%;
        height: 500px;
    }

    .table {
        border-collapse: collapse;

        &_row:nth-child(even) {
            background-color: #dddddd;
        }

        &_data {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            width: 100px;

            & img {
                width: 130px;
                height: 130px;
            }
        }

        &:last-child {
            width: 100%;
        }
    }
</style>