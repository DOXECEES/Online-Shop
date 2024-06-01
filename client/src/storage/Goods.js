import axios from "axios"
import { makeAutoObservable } from "mobx"
import { GetCategories } from "../http/GoodsAPI"

export default class Goods {
    constructor() {
        this._categories = []
        this._types = []
        this._brands = []
        this._availiableBrands = []
        this._devices = []
        this._selectedCategory = {}
        this._selectedType = {}
        this._selectedBrand = {}
        this._itemsInBasket = []
        this._itemIdInBasket = []
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    clearBasket() {
        this._itemsInBasket = [];
    }
    clearActive() {
        this._availiableBrands = [];
    }

    setActiveBrands(item) {
        this._availiableBrands.push(item);
    }
    setActiveBrandsAll(item) {
        this._availiableBrands = item;
    }
    addItemToBasket(item) {
        this._itemsInBasket.push(item);
    }

    clearItemIdBasket() {
        this._itemIdInBasket = [];
    }

    addItemIdToBasket(item) {
        this._itemIdInBasket.push(item);
    }

    deleteItemFromBasket(item) {
        const index = this._itemsInBasket.indexOf(item);
        if (index > -1) {
            this._itemsInBasket.splice(index, 1);
            console.log(this._itemsInBasket);
        }
    }

    setCategories(categories) {
        this._categories = categories;
    }
    setTypes(types) {
        this._types = types;
    }
    setBrands(brands) {
        this._brands = brands;
    }
    setDevices(devices) {
        this._devices = devices;
    }
    setItemsInBasket(items) {
        this._itemsInBasket = items;
    }

    setSelectedCategory(category) {
        this.setPage(1);
        this._selectedCategory = category;
    }
    setSelectedType(type) {
        this.setPage(1);
        this._selectedType = type;
    }
    setSelectedBrand(brand) {
        this.setPage(1);
        this._selectedBrand = brand;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(count) {
        this._totalCount = count;
    }
    get categories() {
        return this._categories;
    }
    get availiableBrands() {
        return this._availiableBrands;
    }

    get itemIdInBasket() {
        return this._itemIdInBasket;
    }
    get itemsInBasket() {
        return this._itemsInBasket;
    }

    get types() {
        return this._types;
    }
    get brands() {
        return this._brands;
    }
    get devices() {
        return this._devices;
    }
    get selectedType() {
        return this._selectedType;
    }
    get selectedBrand() {
        return this._selectedBrand;
    }
    get selectedCategory() {
        return this._selectedCategory;
    }
    get totalCount() {
        return this._totalCount;
    }
    get page() {
        return this._page;
    }
    get limit() {
        return this._limit;
    }



}