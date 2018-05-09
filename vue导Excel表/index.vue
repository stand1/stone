<template>
  <div id='app'>
    <button type='button' id='export-table' @click='onexport'>下载</button>
	<div id='table_out'>
	  <table>
	    <tr>
		   <td>序号</td>
		   <td>ID</td>
		   <td>姓名</td>
		   <td>时间</td>
		</tr>
		<tr>
		   <td>01</td>
		   <td>9527</td>
		   <td>小明</td>
		   <td>2018/05/08</td>
		</tr>
	  </table>
	</div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        
      }
    },
	methods:{
	    onexport: function (evt) {
                let wb = XLSX.utils.table_to_book(document.getElementById("table_out"));
                let wbout = XLSX.write(wb,{bookType:'xlsx',type:'binary'});
				//shetjs.xlsx 为导出Excel表 的表名 可自定义
                saveAs(new Blob([this.s2ab(wbout)],{type:'application/octet-stream'}),"shetjs.xlsx")
            },
            s2ab: function (s) {
                if(typeof ArrayBuffer !== "undefined"){
                    let buf = new ArrayBuffer(s.length)
                    let view = new Uint8Array(buf);
                    for(let i=0;i!=s.length;i++) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf
                }else {
                    let buf = new Array(s.length);
                    for(let i=0;i!=s.length;i++) buf[i] = s.charCodeAt(i) & 0xFF;
                    return buf
                }
            }
	}
  }
</script>


