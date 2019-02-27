$(document).ready(function () {
	new Vue({
		el: "#js_form",
		data: {
			username: "",
			password: ""
		},
		methods: {
			submitFun: function () {
				if (this.username.length == 0 || this.password.length == 0) {
					alert("请输入正确的用户名或密码");
				} else {
					this.$http.post('./login.php', {
						username: this.username,
						password: this.password,
					}, {
						emulateJSON: true //option,配置
					}).then(function (res) { //成功
						if (res.data == 0){ //得到的数据
							alert("用户名或密码错误!!!");
						} else if (res.data == 1) {
							window.location.href = './select.html'
						} else if (res.data == 2) {
							window.location.href = './root.html'
						}
					}, function (res) {
						alert("请检查网络设置!!!");
						return false;
					});

				}
			}
		}
	});
})
