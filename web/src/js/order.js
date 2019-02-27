$(document).ready(function () {
	var vm = new Vue({
		el:"#js_div",
		data:{
			orders:[],
			allOrders:0,
			allprice:0,
			username:"",
			order:"",
			index:0
		},
		methods:{
			getData: function (order,index) {
				this.order = order;
				this.index = index;
			},
			deleteOrder: function () {
				//alert(this.order);
				//console.log(this.order);
				this.$http.post('./delete.php', { //删除车的数据
					order:this.order
				}, {
					emulateJSON: true //option,配置
				}).then(function (res) { //成功
					//alert(res.data);
					//console.log(res.data);
					if (res.data == 0) { //得到的数据
						alert("删除失败")
					}else if (res.data == 1) { //得到的数据
						this.orders.splice(this.index, 1);

					}
				}, function (res) {
					alert("请检查网络设置!!!");
					return false;
				});
			}
		}
	});


	vm.$http.post('./order.php', { //添加车的数据
	}, {emulateJSON: true //option,配置
	}).then(function (res) { //成功
		//alert(res.data);
		//console.log(res.data);
		if (res.data == 0) { //得到的数据
			this.orders = [];
			this.allOrders = 0;
			this.allprice = 0;
		}else if (res.data) { //得到的数据
			this.orders = res.data[0];
			this.allOrders = res.data[2];
			this.allprice = res.data[1];
		}
	}, function (res) {
		alert("请检查网络设置!!!");
		return false;
	});
	
	vm.$http.post("./username.php", {}, {
		emulateJSON: true //option,配置
	}).then(function (res) { //成功
		if (res.data) {
			//alert(res.data);
			//console.log(res.data);
			vm.username = res.data;
		} else {
			return false;
		}
	}, function (res) {
		alert("请检查网络设置!!!")
		return false;
	});
});
