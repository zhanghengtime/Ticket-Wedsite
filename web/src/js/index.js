$(document).ready(function () {
	new Vue({
		el: "#container",
		data: {
			startStation: "",
			endStation: "",
			date: "",
			orders: []
		},
		methods: {
			turnLogin:function(){
				window.location.href = "./src/page/login.html"
			},
			
			submitFun: function () {
				if (this.startStation.length != 0 && this.endStation.length != 0 && this.date.length != 0) {
					this.$http.post("./index.php", {
						startStation: this.startStation,
						endStation: this.endStation,
						date: this.date
					}, {
						emulateJSON: true //option,配置
					}).then(function (res) { //成功
						//console.log([{naem:"asd"},{sd:"asdsd"}])
						if (res.data == 0) {
							var string ='<div id="error"><img id="img_error" src="src/image/error.png"><div id="div_error"> 很抱歉，该条件下无车次信息<br/> 你可以试试更改搜索条件重新搜索，或选择中转</div></div>'
							$("#js_tips").replaceWith(string);
							
						} else {
							$("#error").remove();
							this.orders = res.data;
							console.log(res.data)
						}
					}, function (res) {
						alert("请检查网络设置!!!")
						//return false;
					});
				}
			}
		}
	})
})
