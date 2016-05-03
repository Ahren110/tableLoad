###tableLoad###
由于在项目中经常遇到加载表格数据的情况，而且数据量一般会很大；所以写了一个表格数据加载插件；version0.1 待续...


###使用方法###
1. 引入tableLoad.js,给表格的父元素加上一个id；
2. 使用函数dealTable.lazyLoad('table-wrap', 100);


| name          | type          | note          |
| ------------- |-------------  | -----         |
| id            | String        | 表格父元素id    |
| number        | Number        | 表格父元素下所隐藏的表格内容的高度 |

