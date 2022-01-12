export default {

    getListPageByType(curPage, pageNum, url){

        let listPages = [];
        let i = curPage - 2;
        let endPage = curPage + 2;
        if(pageNum <= 5){
            i = 1;
            while (i <= pageNum){
                listPages.push({
                    value: i, isCur: false
                    , url: '/products' + url
                });
                i++;
            }
            return listPages;
        }
        if (i <= 0) {
            i = 1;
            endPage += 2;
        } else if (i >= 3) {
            listPages.push({
                value: 1, isCur: false
                ,url: '/products' + url
            });
            listPages.push({
                value: "...", isCur: false
                ,url: '/products' + url
            })
        } else if (i == 2) {
            listPages.push({
                value: 1, isCur: false
                ,url: '/products' + url
            });
        }
        for (i; i < endPage + 1; i++) {
            if (i > pageNum)
                break;
            listPages.push({
                value: i, isCur: i === curPage
                ,url: '/products' + url
            })
        }
        if (i === pageNum) {
            listPages.push({
                value: i, isCur: false
                ,url: '/products' + url

            });
        }
        if (i <= pageNum - 1) {
            listPages.push({
                value: "...", isCur: false
                ,url: '/products' + url
            });
            listPages.push({
                value: pageNum, isCur: false
                ,url: '/products' + url
            });
        }
        return listPages;
    },

    getListSearchByNamePage(curPage, pageNum, key)
    {
        let listPages = [];
        let i = curPage - 2;
        let endPage = curPage + 2;
        if(pageNum <= 5){
            i = 1;
            while (i <= pageNum){
                listPages.push({
                    value: i, isCur: false
                    , url: `/products/bySearch/${i}?${key}`
                });
                i++;
            }
            return listPages;
        }
        if (i <= 0) {
            i = 1;
            endPage += 2;
        } else if (i >= 3) {
            listPages.push({
                value: 1, isCur: false, url: `/products/bySearch/${i}?${key}`
            });
            listPages.push({
                value: "...", isCur: false, url: `/products/bySearch/${i}?${key}`
            })
        } else if (i == 2) {
            listPages.push({
                value: 1, isCur: false, url: `/products/bySearch/${i}?${key}`
            });
        }
        for (i; i < endPage + 1; i++) {
            if (i > pageNum)
                break;
            listPages.push({
                value: i, isCur: i === curPage, url: `/products/bySearch/${i}?${key}`
            })
        }
        if (i === pageNum) {
            listPages.push({
                value: i, isCur: false, url: `/products/bySearch/${i}?${key}`
            });
        }
        if (i <= pageNum - 1) {
            listPages.push({
                value: "...", isCur: false, url: `/products/bySearch/${i}?${key}`
            });
            listPages.push({
                value: pageNum, isCur: false, url: `/products/bySearch/${i}?${key}`
            });
        }
        return listPages;
    },


}