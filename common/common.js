

	
	/** 回填的省市联动的打开默认索引切换
		 const star = this.columns3[0].indexOf(this.province) // 省份数据
		 this.$refs.cityPicker.setColumnValues(1, this.columnData[star])
		 const end = this.columnData[star].indexOf(this.city)
		 this.$nextTick(() => {
			this.defaultIndex = [star, end]
		 })
	 */
	// 全国省份数据
	export const provinceData = [
		["北京", "上海", "天津", "重庆", "山东", "河南", "湖北", "湖南", "广东", "河北", "山西", "辽宁", "吉林", "内蒙古", "黑龙江", "江苏", "浙江",
			"安微", "福建", "江西", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "广西", "西藏", "宁夏", "新疆", "海南", "香港", "澳门", "台湾"
		],
	]
	// 全国省份数据 -- 省市联动
	export const provinceCityData = [
		["北京", "上海", "天津", "重庆", "山东", "河南", "湖北", "湖南", "广东", "河北", "山西", "辽宁", "吉林", "内蒙古", "黑龙江", "江苏", "浙江",
			"安微", "福建", "江西", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "广西", "西藏", "宁夏", "新疆", "海南", "香港", "澳门", "台湾"
		],
		// 联动数据默认第二项为省份第一项的子节点
		["东城", "西城", "海淀", "朝阳", "丰台", "石景山", "通州", "顺义", "房山", "大兴", "昌平", "怀柔", "平谷", "门头沟", "密云", "延庆"],
	]
	// 省份对应的市级数据
	export const cityData = [
		["东城", "西城", "海淀", "朝阳", "丰台", "石景山", "通州", "顺义", "房山", "大兴", "昌平", "怀柔", "平谷", "门头沟", "密云", "延庆"],
		["黄浦", "浦东", "徐汇", "长宁", "静安", "普陀", "闸北", "虹口", "杨浦", "闵行", "宝山", "嘉定", "金山", "松江", "青浦", "奉贤", "崇明"],
		["和平", "河西", "南开", "河东", "河北", "红桥", "东丽", "津南", "西青", "北辰", "滨海新区"],
		["万州", "黔江", "涪陵", "渝中", "大渡口", "江北", "沙坪坝", "九龙陂", "南岸", "北碚", "渝北", "巴南", "长区", "江津", "合川", "永川",
			"南川", "綦江", "大足", "铜梁"
		],
		["济南", "青岛", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "滨州", "德州", "聊城", "临沂", "菏泽", "莱芜"],
		["郑州", "开封", "洛阳", "平顶山", "安阳", "鹤壁", "新乡", "焦作", "濮阳", "许昌", "漯河", "三门峡", "商丘", "周口", "驻马店", "南阳",
			"信阳", "济源"
		],
		["武汉", "黄石", "十堰", "荆州", "宜昌", "襄阳", "鄂州", "荆门", "黄冈", "孝感", "咸宁", "仙桃", "潜江", "恩施", "神农架", "天门", "随州"],
		["长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "娄底", "郴州", "永州", "怀化", "湘西"],
		["广州", "深圳", "珠海", "汕头", "佛山", "东莞", "中山", "潮州", "惠州", "湛江", "肇庆", "江门", "茂名", "韶关", "揭阳", "云浮", "梅州",
			"汕尾", "河源", "阳江", "清远"
		],
		["石家庄", "保定", "沧州", "衡水", "邢台", "邯郸", "张家口", "廊坊", "唐山", "秦皇岛", "承德"],
		["太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁"],
		["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
		["长春", "吉林", "四平", "辽源", "通化", "白山", "白城", "松原", "延边", "长白山", "梅河口", "公主岭"],
		["呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "兴安盟", "锡林郭勒", "阿拉善"],
		["哈尔滨", "齐齐哈尔", "鸡西", "鹤岗", "双鸭山", "大庆", "伊春", "佳木斯", "七台河", "牡丹江", "黑河", "绥化", "大兴安岭"],
		["南京", "无锡", "徐州", "常州", "苏州", "南通", "连云港", "淮安", "盐城", "扬州", "镇江", "秦州", "宿州"],
		["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州", "舟山", "台州", "丽水"],
		["合肥", "芜湖", "蚌埠", "马鞍山", "宿州", "安庆", "淮南", "铜陵", "黄山", "宣城", "池州", "滁州", "淮北", "阜阳", "六安", "毫州"],
		["福州", "厦门", "漳州", "泉州", "三明", "莆田", "南平", "龙岩", "宁德", "平潭"],
		["南昌", "九江", "上饶", "抚州", "宜春", "吉安", "赣州", "景德镇", "萍乡", "新余", "鹰潭"],
		["成都", "绵阳", "自贡", "攀枝花", "泸州", "德阳", "广元", "遂宁", "内江", "乐山", "资阳", "宜宾", "南充", "达州", "雅安", "阿坝", "甘孜",
			"凉山", "广安", "巴中", "眉山"
		],
		["贵阳", "六盘水", "遵义", "铜仁", "黔西", "毕节", "安顺", "黔东", "黔南"],
		["昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "普洱", "临沧", "德宏", "怒江", "迪庆", "大理", "楚雄", "红河", "文山", "西双版纳"],
		["西安", "宝鸡", "咸阳", "渭南", "铜川", "治中", "安康", "商洛", "榆林", "延安", "汉中", "杨陵"],
		["兰州", "嘉峪关", "金昌", "白银", "天水", "酒泉", "张掖", "武威", "定西", "陇南", "平凉", "庆阳", "临夏", "甘南"],
		["西宁", "海东", "海北", "黄南", "海南", "果洛", "玉树", "海西"],
		["南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色", "贺州", "河池", "来宾", "崇左"],
		["拉萨", "昌都", "日喀则", "山南", "那曲", "阿里", "林芝"],
		["", "银川", "石嘴山", "吴忠市", "固原市", "中卫"],
		["乌鲁木齐", "克拉玛依", "吐鲁番", "哈密", "昌吉", "博尔塔", "巴音郭楞", "阿克苏", "克孜勒苏柯尔克", "喀什", "和田", "伊犁", "塔城", "阿勒泰",
			"石河子", "阿拉尔", "图木舒克", "五家渠", "北屯", "铁门关", "双河市"
		],
		["海口", "三亚", "三沙"],
		["中西区", "湾仔区", "东区", "南区", "油尖旺", "深水埗", "九龙城", "黄大仙", "观塘", "葵青", "荃湾", "屯门", "元朗", "北区", "大埔", "沙田",
			"西贡", "离岛"
		],
		["花地玛堂", "圣安多尼堂", "大堂", "望德堂", "风顺堂", "嘉模堂", "圣方济各堂"],
		["台北", "新北", "桃园", "台中", "台南", "高雄", "基隆", "新竹", "嘉义"]
	]

