<template>
    <div class="add" style="display: flex; margin-top: 50px;">
        <div class="add_title">
            Изменение товара
        </div>
    </div>

    <div class="row">
        <div class="col">
            <form @submit.prevent="postUpdate" ref="form_chg">
                <div class="item_div">
                    <div class="item_div_inner"><p>Наименование</p></div>
                    <div>
                        <input type="text" name="name" id="name" placeholder="Введите название" v-model="form.name">
                    </div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner"><p>Цена</p></div>
                    <div><input type="number" name="price" id="price" v-model="form.price" placeholder="Введите Цена">
                    </div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" ><p>Количество</p></div>
                    <div><input type="number" name="count" id="count" placeholder="Введите колличество"
                                v-model="form.count"></div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" ><p>Процент наценки</p></div>
                    <div><input type="number" name="percent" id="percent" placeholder="Введите процент наценки"
                                v-model="form.percent"></div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" ><p>Минимальный процент <br> наценки</p>
                    </div>
                    <div><input type="number" name="min_percent" id="min_percent"
                                placeholder="Введите минимальную наценку" v-model="form.min_percent"></div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" ><p> Описание</p></div>
                    <div><textarea class="text" name="description" id="description" placeholder="Введите описание"
                                   v-model="form.description"></textarea></div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner"><p> Изображение</p></div>
                    <div><input type="file" name="image" id="image" @change="item.image" ref="chgImg"></div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" ><p>Дата добавления</p></div>
                    <div>
                        {{("0" + new Date(item.pub_date).getDate()).substr(-2)}}.{{
                        new Date(item.pub_date).getMonth() }}.{{ new Date(item.pub_date).getFullYear()}}
                        {{new Date(item.pub_date).getHours()}}:{{(":"+"0"+new
                        Date(item.pub_date).getMinutes()).substr(-2)}}
                    </div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner"><p>ID</p></div>
                    <div>{{item.id}}</div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner"><p>Цена продажи</p></div>
                    <div>{{item.max_price}}</div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner"><p>Прибыль с одного</p></div>
                    <div>{{item.income}}</div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" ><p>Минимальная цена</p></div>
                    <div>{{item.min_price}}</div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner"><p>Средняя цена</p></div>
                    <div>{{item.mid_price}}</div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner"><p>Общая сумма :</p></div>
                    <div>{{item.quantity_self}}</div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner"><p>Общая сумма с процентом :</p></div>
                    <div>{{item.quantity_percent}}</div>
                </div>

                <div class="button_style">
                    <input type="submit" value="Отправить">
                    <router-link to="/sclad"> <button class="button_cancel" >Отменить</button></router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Add",
        props: ['id'],
        data() {
            return {
                currencyValue: '',
                formattedCurrencyValue: "",
                form: {
                    name: '',
                    price: '',
                    count: '',
                    percent: '',
                    min_percent: '',
                    description: '',
                    image: '',
                },
            }
        },
        computed: {
            item() {
                return this.$store.state.activeItem
            }
        },
        watch: {
            item() {
                for (const i in this.form) {
                    this.form[i] = this.$store.state.activeItem[i]
                }
            },
        },
        methods: {
            /*           focusOut() {
                           this.currencyValue = parseFloat(this.formattedCurrencyValue.replace(/[^\d.]/g, ""))
                           if (isNaN(this.currencyValue)) {
                               this.currencyValue = 0
                           }
                           // Format display value based on calculated currencyValue
                           this.formattedCurrencyValue = this.currencyValue.toFixed().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
                       },
                       focusIn() {
                           // Unformat display value before user starts modifying it
                           this.formattedCurrencyValue = this.currencyValue.toString()
                       },*/
            async getUpdate() {
                await this.$store.dispatch('getUpdateItem', this.id)
            },
            postUpdate() {
                this.form.image = this.$refs.chgImg.files[0];
                this.$store.dispatch('postUpdateItem', {form: this.form, id: this.id})
            }
        },
        async created() {
            await this.getUpdate(this.id)
        }

    }
</script>

<style scoped lang="scss">
    .img_desc {
        width: 200px;
        height: 200px;
        object-fit: cover;
    }

    .add_title {
        font-size: 30px;
        font-family: sans-serif;
        margin: 20px 0;
        margin-right: 30px;
        padding: 0 40px;
    }

    .text {
        resize: none;
        width: 88%;
        height: 150px;
        font-size: 20px;
        padding: 20px;
        border-radius: 20px;
        outline: none;
    }

    .item_div {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding: 5px 0;

        input {
            border: 1px solid gray;
            border-radius: 5px;
            padding: 8px 8px 8px 8px;
            outline: none;
        }

        textarea {
            border: 1px solid gray;
            border-radius: 5px;
            outline: none;
        }

    }

    .item_div_inner {
        margin-left: 30px;
        width: 300px;

        p {
            font-family: sans-serif;
            font-size: 20px;

        }
    }

    .button_style input {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: .25rem;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        color: #fff;
        background-color: #28a745;
        outline: none;
        margin-left: 10px;

        &:hover {
            background: #1a662f;
        }
    }

    .button_style {
        margin: 20px;
    }

    .button_cancel {
        background: #c82333 !important;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: .25rem;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        color: #fff;
        outline: none;
        margin-left: 10px;
        &:hover {
            background-color: #721316 !important;
        }
    }
</style>