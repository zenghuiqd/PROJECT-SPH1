<template>
    <div class="pagination">
        <h1>{{startNumEndNum}}---当前的页码是{{pageNo}}</h1>
        <button>上一页</button>
        <button v-if="startNumEndNum.start>1">1</button>
        <button v-if="startNumEndNum.start>2">···</button>

        <template v-for="(page,index) in startNumEndNum.end ">          
                <button :key="index" v-if="page >= startNumEndNum.start">{{page}}</button>            
        </template>
       
        <button v-if="startNumEndNum.end<totalPage-1">···</button>
        <button v-if="startNumEndNum.end<totalPage">{{ totalPage }}</button>
        <button>下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'continues', 'total'],
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        startNumEndNum() {
            const { totalPage, continues, pageNo } = this;
            //先定义两个变量存储起始数字和结束数字
            let start = 0;
            let end = 0;
            //连续页面数字5[就是至少5页],如果出现不正常的现象[就是不够五页]
            if (continues > totalPage) {
                start = 1;
                end = totalPage
            } else {
                start = pageNo - parseInt(continues / 2);
                end = pageNo + parseInt(continues / 2);
                if (start < 1) {
                    start = 1;
                    end = continues;
                };
                if (end > totalPage) {
                    end = totalPage;
                    start = totalPage - continues + 1;
                }
            };
            return {start,end};
        }
    }
}
</script>
  
<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>