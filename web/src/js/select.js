$(document).ready(function () {
	var orders = { //2.0的组件
		template: "#create_order"
	};
	var vue = new Vue({
		el: "#js_div",
		data: {
			selects:false,
			time:300,
			myOrder: false,
			username: "user",
			startStation: "",
			endStation: "",
			date: "",
			orders: [],
			myOrderData: {},
			select: true,
			order: false,
			orderData: {},
			tips: [true, false, false],
			userdata: [{
				num: 1,
				name: "",
				id: ""
			}],
			style:1
		},
		methods: {
			checkData(event,data){
				if (data.length == 0) {
					event.target.addClass("has-error");
					event.target.removeClass("has-success");
				}else{
					event.target.addClass("has-success");
					event.target.removeClass("has-error");
				}
			},
			submitFun: function () {
				if (this.startStation.length != 0 && this.endStation.length != 0 && this.date.length != 0) {
					this.$http.post("./data.php", {
						startStation: this.startStation,
						endStation: this.endStation,
						date: this.date
					}, {
						emulateJSON: true //option,配置
					}).then(function (res) { //成功
						//console.log([{naem:"asd"},{sd:"asdsd"}])
						if (res.data == 0) {
							var string = '<div id="error" class="animated lightSpeedIn"><img id="img_error" src="../image/error.png"><div id="div_error"> 很抱歉，该条件下无车次信息<br/> 你可以试试更改搜索条件重新搜索，或选择中转</div></div>'
							$("#js_tips").replaceWith(string);
							this.orders = [];
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
			},
			orderFun: function (json) {
				this.orderData = json;
				this.select = false;
				this.order = true;
			},
			helpself: function () {
				this.tips = [true, false, false];
				$("#js_helpself").addClass("tip_click");
				$("#js_emailFun").removeClass("tip_click");
				$("#js_telFun").removeClass("tip_click");
			},
			emailFun: function () {
				this.tips = [false, true, false];
				$("#js_emailFun").addClass("tip_click");
				$("#js_helpself").removeClass("tip_click");
				$("#js_telFun").removeClass("tip_click");
			},
			telFun: function () {
				this.tips = [false, false, true];
				$("#js_telFun").addClass("tip_click");
				$("#js_emailFun").removeClass("tip_click");
				$("#js_helpself").removeClass("tip_click");
			},
			addUser: function () {
				var c = this.userdata.length + 1
				var a = {};
				a.num = c;
				a.name = "";
				a.id = "";
				this.userdata.push(a);
			},
			sendUsers: function () {
				console.log(this.orderData.ID)
						console.log(this.userdata)
					console.log(this.style)
				this.$http.post("./selectdata.php", {  //价格 用户信息 车次信息  订单id
					ID : this.orderData.ID,
					userdata :this.userdata,
					style :this.style
				}, {
					emulateJSON: true //option,配置
				}).then(function (res) { //成功
					//console.log([{naem:"asd"},{sd:"asdsd"}])
					if (res.data == 0) {
						alert("暂无票请重新选择")
						window.location.href = '../page/select.html'
					} else {
						console.log(res.data);
						this.order = false;
						this.myOrder = true;
						this.time = 300;
						this.myOrderData.car = res.data[0];
						this.myOrderData.price = res.data[1];
						this.myOrderData.users = res.data[2];
					}
				}, function (res) {
					alert("请检查网络设置!!!")
					//return false;
				});
			},
			sendOrder: function () {
				if(this.time==0) return false;

				this.$http.post("./zhifu.php", {
					id: this.myOrderData
				}, {
					emulateJSON: true //option,配置
				}).then(function (res) { //成功
					//console.log([{naem:"asd"},{sd:"asdsd"}])php
					//console.log(res.data);
					//alert(res.data);
					if (res.data == 0) {
						alert("暂无票请重新选择")
						window.location.href = '../page/select.html'
					} else {
						alert("支付成功");
						location.replace('./select.html')
					}
				}, function (res) {
					alert("请检查网络设置!!!");
					//return false;
				});
			}
		},
		component: {
			'my_order': orders
		}
	});

function timedown(){
	setInterval(function(){
		if (vue.time) vue.time--;
		else {$(js_apply).addClass("disabled")}
	},1000)
}
timedown()

Vue.filter('totime',function (value) {
	if (!value) {return "00:00";}
	var a = Math.floor(value/60);
	var b = value%60;
	var minute = a<=9?"0"+a:a;
	var second = b<=9?"0"+b:b;
	console.log( minute+":"+second)
	return minute+":"+second;
})

	//获得用户名

vue.$http.post("./username.php", {}, {
		emulateJSON: true //option,配置
	}).then(function (res) { //成功
		if (res.data) {
			//alert(res.data);
			vue.username = res.data;
		} else {
			return false;
		}
	}, function (res) {
		alert("请检查网络设置!!!")
		return false;
	});

	//获取过去的数据
	vue.$http.post("./lastdata.php", {}, {
		emulateJSON: true //option,配置
	}).then(function (res) { //成功
		//console.log([{naem:"asd"},{sd:"asdsd"}])
		console.log(res.data);
		if (res.data==0) {
			this.orders = "";
		} else {
			$("#error").remove();
			this.orders = res.data;
		}
	}, function (res) {
		alert("请检查网络设置!!!")
		return false;
	});
})