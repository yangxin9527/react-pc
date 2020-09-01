import {observable, action} from 'mobx'

export default class UIStore {

    @observable name = "sun"

    @action
    changeName() {
        if (this.name === "sun") {
            this.name = "wen"
        } else {
            this.name = "sun"
        }
    }
}

