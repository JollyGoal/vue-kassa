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
                            <input type="text" placeholder="Поиск">
                            <div class="btn_block">
                                <div class="add_input_btn">
                                    <div class="search_btn"><i class="far fa-search"></i> Поиск</div>
                                </div>
                                <div class="add">
                                    <div class="add_input_btn">
                                        <router-link to="/add">
                                            <div class="add_btn"><i class="fas fa-plus"></i> Добавить товар</div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="elem">
                    <div class="elem_wrap">
                        <div class="element_wrap_row">
                            <div class="flex_box">
                                <div class="table_block">
                                    <table class="table">
                                        <tr class="table_row">
                                            <th class="table_data">Наименовая</th>
                                            <th class="table_data">Номер</th>
                                            <th class="table_data">сумма</th>
                                            <th class="table_data">Удалить</th>
                                        </tr>
                                        <tr @click="openObj(index)" class="table_row" v-for="(item, index) in tovar"
                                            :key="index">
                                            <td class="table_data">{{item.name}}</td>
                                            <td class="table_data">{{item.id}}</td>
                                            <td class="table_data">{{item.prise}}</td>
                                            <td class="table_data">
                                                <button s>
                                                    <i class="fas fa-trash-alt"></i>  удалить
                                                </button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="table_block">
                                    <table class="table">
                                        <tr class="table_row">
                                            <th class="table_data">Наименовая</th>
                                            <th class="table_data">Номер</th>
                                            <th class="table_data">сумма</th>
                                            <th class="table_data hide">Картинка</th>
                                            <th class="table_data hide">Описание</th>
                                        </tr>
                                        <tr class="table_row">
                                            <th class="table_data">{{obj.name}}</th>
                                            <th class="table_data">{{obj.id}}</th>
                                            <th class="table_data">{{obj.prise}}</th>
                                            <th class="table_data hide"><img :src="obj.img" alt=""></th>
                                            <th class="table_data hide">{{obj.count}}</th>
                                        </tr>
                                    </table>
                                </div>
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
        name: "Sclad",
        data() {
            return {
                obj: {
                    name: "",
                    id: "",
                    prise: "",
                    img: "",
                    count: "",
                },
                tovar: [
                    {
                        id: 9813569,
                        name: "tarelka",
                        prise: "1",
                        img: "https://i.pinimg.com/originals/4b/ba/6f/4bba6f4d487a8029817f63ff9101911d.jpg",
                        count: "1",
                    },
                    {
                        id: 9813569,
                        name: "tarelka",
                        prise: "2",
                        img: "https://www.google.com/search?q=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&safe=active&sxsrf=ALeKk03DZ1tav_pK3_DuDvtwrUCjGIwMug:1615742461222&source=lnms&tbm=isch&biw=1920&bih=969#imgrc=HnhKplPWRplAkM",
                        count: "1",
                    },
                    {
                        id: 9813569,
                        name: "tarelka",
                        prise: "3",
                        img: "https://st2.depositphotos.com/3364363/5972/i/600/depositphotos_59728757-stock-photo-waiting-for-a-new-day.jpg",
                        count: "1",
                    },
                    {
                        id: 9813569,
                        name: "tarelka",
                        prise: "4",
                        img: "https://i.pinimg.com/originals/4b/ba/6f/4bba6f4d487a8029817f63ff9101911d.jpg",
                        count: "1",
                    },

                ],
            }
        },
        methods: {
            openObj(index) {
                console.log(this.obj = this.tovar[index])
            }
        }
    }
</script>

<style lang="scss" scoped>
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
            background: none;
            padding: 12px 20px;
            width: 65px;
            border-radius: 10px;
            margin-left: 15px;
            color: white;
            background: #007bff;
            font-size: 15px;
            outline: none;
            cursor: pointer;

            &:hover {
                background: #0062cc;
            }
        }
    }

    .add_input_btn {
        width: 120px;
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
                background: #0062cc;
            }
        }
    }

    .elem {
        &_wrap {
            margin-top: 30px;
            width: 100%;
            margin-right: auto;
            height: 500px;
        }

        &_row {
        }
    }

    .search_result {
        display: flex;
        justify-content: space-around;
        font-size: 30px;

    }

    .flex_box {
        display: flex;
        flex: 1 0;
        justify-content: space-around;
    }

    .table_block {
        width: 100%;

        &:first-child .table {
            width: 80%;
        }
    }

    .table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;

        &_row:nth-child(even) {
            background-color: #dddddd;
        }

        &_data {
            border: 1px solid #dddddd;
            text-align: center;
            & img {
                width: 130px;
                height: 130px;
            }
        }

        &:last-child {
            width: 100%;
        }
    }

    .hide {
        display: table-cell;
    }

    @media screen and (max-width: 768px) {
        .hide {
            display: none;
        }
        .sklad_title {
            font-size: 25px;
            margin-bottom: 20px;
        }
        .flex_box {
            flex-direction: column;
        }
        .table_block {
            width: 100%;

            &:first-child .table {
                width: 100%;
                margin-bottom: 20px;
            }
        }
        .search {
            flex-direction: column;

            &_btn {
                margin-left: 0;
                margin-top: 20px;
            }
        }
        .add {
            margin: 20px 0;
            padding: 0;

            &_input_btn {
                margin-right: 10px;
            }
        }
    }

    .add_input_btn {
        width: 120px;
    }

    .creative {
        flex-direction: column;
    }

    @media screen and (max-width: 576px) {
        .sklad_title {
            font-size: 22px;
        }
    }
</style>