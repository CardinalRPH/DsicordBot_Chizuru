class ThePageState {
    constructor() {
        this.pageSize = 7;
        this.CurrentPage = 0;
    }

    set setCurrentPage(value) {
        this.CurrentPage = value;
    }

    get getCurrentPage() {
        return this.CurrentPage;
    }

    get getPageSize() {
        return this.pageSize;
    }

}

const PageState = new ThePageState();
export default PageState;