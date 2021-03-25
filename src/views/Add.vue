<template>
    <div class="add" style="display: flex; margin-top: 50px;">
        <div class="add_title">
            Изменение товара
        </div>

        <div class="button_style" style="">
            <button>Отправить</button>
            <button class="button_cancel">Отменить</button>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <form action="">
                <div class="item_div">
                    <div class="item_div_inner"><p>Наименование</p></div>
                    <div><input type="text" placeholder="Введите название"></div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 200px;"><p>Цена</p></div>
                    <div><input type="number" placeholder="Введите Цена"></div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 130px;"><p>Количество</p></div>
                    <div><input type="number" placeholder="Введите колличество"></div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 80px;"><p>Процент наценки</p></div>
                    <div><input type="number" placeholder="Введите процент наценки"></div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 30px;"><p>Минимальный процент <br> наценки</p>
                    </div>
                    <div><input type="number" placeholder="Введите минимальную наценку"></div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 150px;"><p> Описание</p></div>
                    <div><textarea name="" id="" cols="30" rows="5" placeholder="Введите описание"></textarea></div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner"><p> Изображение</p></div>
                    <div><input type="file"></div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 100px;"><p>Дата добавления</p></div>
                    <div> 656565665 </div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 250px;"><p>ID</p></div>
                    <div>654564564564</div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 180px;"><p>Sell price</p></div>
                    <div>565646545</div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 200px;"><p>Income</p></div>
                    <div>56456456</div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 180px;"><p>Min price</p></div>
                    <div>6456465</div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 180px;"><p>Mid Price</p></div>
                    <div>54161515</div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 150px;"><p>Quantity Self</p></div>
                    <div>6156165156</div>
                </div>

                <div class="item_div">
                    <div class="item_div_inner" style="margin-right: 100px;"><p>Quantity Percent</p></div>
                    <div>6546456456</div>
                </div>

                <div class="button_style" style="">
                    <button>Отправить</button>
                    <button class="button_cancel">Отменить</button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Add",
        data() {
            return {
                currencyValue: '',
                formattedCurrencyValue: ""
            }
        },
        methods: {
            focusOut() {
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
            },
        },

    }
</script>

<style scoped lang="scss">
    .add_title {
        font-size: 30px;
        font-family: sans-serif;
        margin: 20px 0;
        margin-right: 30px;
        padding: 0 40px;
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
        margin-right: 100px;
        margin-left: 30px;

        p {
            font-family: sans-serif;
            font-size: 20px;
            font-weight: 600;
        }
    }

    .button_style button {
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
        &:hover {
            background-color: #721316 !important;
        }
    }
</style>