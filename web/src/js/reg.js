$(document).ready(function () {
	new Vue({
		el: "#js-form",
		data: {
			name: "",
			password: "",
			password1: "",
			email: "",
			tel: "",
			id: "",
			date: "",
			submit: false,
			inputData: ""
		},
		methods: {
			nameFun: function () {
				if (this.name.length <= 6) {
					$("#js_name").removeClass("has-success");
					$("#js_name").addClass("has-error");
					$("#js_name_tip").removeClass("font_right");
					$("#js_name_tip").addClass("font_error");
					document.getElementById("js_name_tip").innerHTML = "请输入超过超过6个字符"
					this.submit = false;
				} else {
					$("#js_name").removeClass("has-error");
					$("#js_name").addClass("has-success");
					$("#js_name_tip").removeClass("font_error");
					$("#js_name_tip").addClass("font_right");
					document.getElementById("js_name_tip").innerHTML = "<font class='glyphicon glyphicon-ok'></font>"
					this.submit = true;
				}
			},
			passwordFun: function () {
				if (this.password.length <= 6) {
					$("#js_password").removeClass("has-success");
					$("#js_password").addClass("has-error");
					$("#js_password_tip").removeClass("font_right");
					$("#js_password_tip").addClass("font_error");
					document.getElementById("js_password_tip").innerHTML = "请输入超过超过6个字符";
					this.submit = false;
				} else {
					$("#js_password").removeClass("has-error");
					$("#js_password").addClass("has-success");
					$("#js_password_tip").removeClass("font_error");
					$("#js_password_tip").addClass("font_right");
					document.getElementById("js_password_tip").innerHTML = "<font class='glyphicon glyphicon-ok'></font>";
					this.submit = true;

				}
			},
			passwordCheck: function () {
				if (this.password != this.password1) {
					$("#js_password1").removeClass("has-success");
					$("#js_password1").addClass("has-error");
					$("#js_password1_tip").removeClass("font_right");
					$("#js_password1_tip").addClass("font_error");
					document.getElementById("js_password1_tip").innerHTML = "请输入相同的密码";
					this.submit = false;
				} else {
					$("#js_password1").removeClass("has-error");
					$("#js_password1").addClass("has-success");
					$("#js_password1_tip").removeClass("font_error");
					$("#js_password1_tip").addClass("font_right");
					document.getElementById("js_password1_tip").innerHTML = "<font class='glyphicon glyphicon-ok'></font>";
					this.submit = true;
				}
			},
			emailFun: function () {
				var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if (!reg.test(this.email)) {
					$("#js_email").removeClass("has-success");
					$("#js_email").addClass("has-error");
					$("#js_email_tip").removeClass("font_right");
					$("#js_email_tip").addClass("font_error");
					document.getElementById("js_email_tip").innerHTML = "请输入正确的邮箱"
					this.submit = false;
				} else {
					$("#js_email").removeClass("has-error");
					$("#js_email").addClass("has-success");
					$("#js_email_tip").removeClass("font_error");
					$("#js_email_tip").addClass("font_right");
					document.getElementById("js_email_tip").innerHTML = "<font class='glyphicon glyphicon-ok'></font>";
					this.submit = true;
				}
			},
			telFun: function () {
				var reg = /^\d{11}/;
				if (!reg.test(this.tel)) {
					$("#js_tel").removeClass("has-success");
					$("#js_tel").addClass("has-error");
					$("#js_tel_tip").removeClass("font_right");
					$("#js_tel_tip").addClass("font_error");
					document.getElementById("js_tel_tip").innerHTML = "请输入正确的电话格式";
					this.submit = false;
				} else {
					$("#js_tel").removeClass("has-error");
					$("#js_tel").addClass("has-success");
					$("#js_tel_tip").removeClass("font_error");
					$("#js_tel_tip").addClass("font_right");
					document.getElementById("js_tel_tip").innerHTML = "<font class='glyphicon glyphicon-ok'></font>";
					this.submit = true;
				}
			},
			idFun: function () {
				var reg = /^\d{13}/;
				if (!reg.test(this.id)) {
					$("#js_id").removeClass("has-success");
					$("#js_id").addClass("has-error");
					$("#js_id_tip").removeClass("font_right");
					$("#js_id_tip").addClass("font_error");
					document.getElementById("js_id_tip").innerHTML = "请输入正确的身份证格式";
					this.submit = false;
				} else {
					$("#js_id").removeClass("has-error");
					$("#js_id").addClass("has-success");
					$("#js_id_tip").removeClass("font_error");
					$("#js_id_tip").addClass("font_right");
					document.getElementById("js_id_tip").innerHTML = "<font class='glyphicon glyphicon-ok'></font>";
					this.submit = true;
				}
			},
			inputDateTest: function () {
				var check = ""
				this.$http.post("./inputdata.php", {}, {
					emulateJSON: true //option,配置
				}).then(function (res) { //成功
					check = res.data; //得到的数据
					if (check != this.inputData) {
					$("#js_inputData").removeClass("has-success");
					$("#js_inputData").addClass("has-error");
					$("#js_inputData_tip").removeClass("font_right");
					$("#js_inputData_tip").addClass("font_error");
					document.getElementById("js_inputData_tip").innerHTML = "请输入正确的验证码";
					this.submit = false;
				} else {
					$("#js_inputData").removeClass("has-error");
					$("#js_inputData").addClass("has-success");
					$("#js_inputData_tip").removeClass("font_error");
					$("#js_inputData_tip").addClass("font_right");
					document.getElementById("js_inputData_tip").innerHTML = "<font class='glyphicon glyphicon-ok'></font>";
					this.submit = true;
				}
				}, function (res) {
					return false;
				});

				
			},
			dateFun: function () {
				if (this.date) {
					$("#js_date").removeClass("has-error");
					$("#js_date").addClass("has-success");
					$("#js_date_tip").removeClass("font_error");
					$("#js_date_tip").addClass("font_right");
					document.getElementById("js_date_tip").innerHTML = "<font class='glyphicon glyphicon-ok'></font>";
					this.submit = true;
				}
			},


			submitData: function () {
				if (this.submit == false) {
					alert("请输入正确的数据");
					return false;
				}
				this.$http.post("./reg.php", {
					name: this.name,
					password: this.password,
					email: this.email,
					tel: this.tel,
					id: this.id,
					date: this.date
				}, {
					emulateJSON: true //option,配置
				}).then(function (res) { //成功
					if (res.data == 0) {
						alert("用户名重复。")
					} else {
						window.location.href = './login.html'
					}
				}, function (res) {
					return false;
				});
			}
		}
	});
	$('#inputPassword').popover({
		html: true
	});
	$('#inputPassword').popover('hide');

});
