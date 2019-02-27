$(document).ready(function () {
	var vue = new Vue({
		el: "#js_app",
		data: {
			favorables: [],
			changefavorable: {},
			changefavorable2: {
				id: "",
				num: ""
			},
			favorableIndex: 0,
			tickets: [],
			alltickets: 0,
			allprice: 0,
			showData: [true, false, false],
			cars: [],
			changeCar: {},
			changeCar2: {
				id: null,
				startStation: "",
				endStation: "",
				startDate: "",
				endDate: "",
				price: "",
				tickets: ""
			},
			carIndex: 0
		},
		methods: { 
			changefavorables: function (favorable, index) {
				this.changefavorable = favorable;
				this.changefavorable2.id = favorable.id;
				this.favorableIndex = index;
			},
			savechangefavorable() {
				this.$http.post('./discount.php', { //修改优惠的数据
					changefavorable: this.changefavorable,
					changefavorable2: this.changefavorable2
				}, {
					emulateJSON: true //option,配置
				}).then(function (res) { //成功
					//alert(res.data)

					if (res.data == 0) { //得到的数据
						alert("修改失败");
					} else if (res.data == 1) {
						this.favorables.splice(this.favorableIndex, 1, this.changefavorable2);
						this.changefavorable2 = {
							id: null,
							num: ""
						}
					}
				}, function (res) {
					alert("请检查网络设置!!!");
					return false;
				});
			},
			changeCarFun: function (car, index) {
				this.changeCar = car;
				this.carIndex = index;
			},
			saveChangeCar: function () {
				this.$http.post('./xiugai.php', { //修改车的数据
					changeCar: this.changeCar,
					changeCar2: this.changeCar2
				}, {
					emulateJSON: true //option,配置
				}).then(function (res) { //成功
					//alert(res.data)

					if (res.data == 0) { //得到的数据
						alert("修改失败");
					} else if (res.data == 1) {
						this.cars.splice(this.carIndex, 1, this.changeCar2);
						this.changeCar2 = {
							id: null,
							startStation: "",
							endStation: "",
							startDate: "",
							endDate: "",
							price: "",
							tickets: ""
						}
					}
				}, function (res) {
					alert("请检查网络设置!!!");
					return false;
				});
			},
			deleteCarFun: function (index) {
				this.carIndex = index;
			},
			deleteCar: function () {
				this.$http.post('./shanchu.php', { //删除车的数据
					carDate:this.cars[this.carIndex]
				}, {
					emulateJSON: true //option,配置
				}).then(function (res) { //成功
					//alert(res.data)
					if (res.data == 0) { //得到的数据
						alert("删除失败");
					} else if (res.data == 1) {
						this.cars.splice(this.carIndex, 1);
					}
				})
			},
			addCar:function () {

				this.$http.post('./add.php', { //添加车的数据
					changeCar:this.changeCar2
				}, {
					emulateJSON: true //option,配置
				}).then(function (res) { //成功
					//alert(res.data)
					if (res.data == 0) { //得到的数据
						alert("添加失败");
					} else if (res.data == 1) {
						this.cars.splice(this.cars.length, 1, this.changeCar2);
						this.changeCar2 = {
							id: null,
							startStation: "",
							endStation: "",
							startDate: "",
							endDate: "",
							price: "",
							tickets: ""
						}
					}
				})
			},
		},
		
	});


vue.$http.post('./discounts.php', {	//

	}, {
		emulateJSON: true //option,配置
	}).then(function (res) { //成功
		//alert(res.data)

		if (res.data == 0) { //得到的数据
			alert("");
		} else if (res.data) {
			this.favorables = res.data;
		}
	}, function (res) {
		alert("请检查网络设置!!!");
		return false;
	});



	vue.$http.post('./root.php', {

	}, {
		emulateJSON: true //option,配置
	}).then(function (res) { //成功
		//alert(res.data)

		if (res.data == 0) { //得到的数据
			alert("");
		} else if (res.data) {
			this.cars = res.data
		}
	}, function (res) {
		alert("请检查网络设置!!!");
		return false;
	});

vue.$http.post('./count.php', {

	}, {
		emulateJSON: true //option,配置
	}).then(function (res) { //成功
		//alert(res.data)

		if (res.data == 0) { //得到的数据
			alert("");
		} else if (res.data) {
			this.tickets = res.data.tickets
			this.alltickets = res.data.alltickets
			this.allprice = res.data.allprice.toFixed(2)

		}
	}, function (res) {
		alert("请检查网络设置!!!");
		return false;
	});
});

