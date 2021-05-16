/**************************
*****包含：用户名、分类页**
**************************/
//https://github.com/eva-asdf/vtm.git
//注意要请求数据要加载mockjs
//ajax请求可用jQuery
//用户登录账号的路由为http://vtmer.cn/login
//书本信息的为http://vtmer.cn/class
//搜索页的为http://vtmer.cn/search
//需要将搜索结果返回到url上
//如：搜索：白夜行
//链接为：http://vtmer.cn/search=白夜行
/*********************/ 
//用户名登录表单验证：
//账号(name)都是英文 
//密码(password)都是数字，且长度为6-10

// Mock.mock('http://vtmer.cn/login', {
//      'user|9':[{
//           	name:'@first()',
//           	password:'@string(lower+number,6,10)'
//           }]         
//      });

/**
 * 改动
 *   用户信息
 */
Mock.mock('http://vtmer.cn/login', {
     'user|1':[{
          	name:'caichuangji',
          	password:'123456',
               avatar:'img/d.jpg',
               userId:1,
               introduction:"@region()的"
          }]         
     });


Mock.mock('http://vtmer.cn/class', {
			// 书的大分类
 			'bookclass|4':[{
 				// 书的详情
 				'bookInfo|25-32':[{
                         //书的id 
                         'articleId|+1':1,
 					// 书名
          			title:'@title(1,5)',
          			// 作者
          			author:'@name()',
          			// 出版社
          			publish:'@region()出版社',
          			// 出版时间
          			publishDate:'@date(yyyy-MM-dd)',
          			// 图书馆详情
          			library:[{
          				// 数目
          				total:'@natural(0, 100)',
          				// 位置
          				position:'@natural(2, 7)楼@natural(1,100)架@natural(0, 100)'
          			}],
          			// 书本链接
          			bookUrl:[{
          				doubanUrl:'@url()',
          				zhihuUrl:'@url()'
          			}],
          			// 书本购买链接
          			buyUrl:[{
          				jDUrl:'@url()',
          				DangUrl:'@url()',
          				AmazonUrl:'@url()'
          			}],
          			// 作者介绍
          			ahthorIntro:'@paragraph(3)',
          			// 书本介绍
          			bookIntro:'@paragraph(5)',
          			// 书本封面链接
          			cover: '@image(200x280,@color(),png)',
          			// 评分
          			socre:'@natural(0, 5)',
                         //是否喜欢
                         isLike:'@natural(0, 1)'
 				}]
         	}]
     });


Mock.mock('http://vtmer.cn/search', {
               // 书的大分类
               'bookclass':[{
                    // 书的详情
                    'bookInfo|25-32':[{
                         //书的id 
                         'articleId|+1':1,
                         // 书名
                         title:'@title(1,5)',
                         // 作者
                         author:'@name()',
                         // 出版社
                         publish:'@region()出版社',
                         // 出版时间
                         publishDate:'@date(yyyy-MM-dd)',
                         // 图书馆详情
                         library:[{
                              // 数目
                              total:'@natural(0, 100)',
                              // 位置
                              position:'@natural(2, 7)楼@natural(1,100)架@natural(0, 100)'
                         }],
                         // 书本链接
                         bookUrl:[{
                              doubanUrl:'@url()',
                              zhihuUrl:'@url()'
                         }],
                         // 书本购买链接
                         buyUrl:[{
                              jDUrl:'@url()',
                              DangUrl:'@url()',
                              AmazonUrl:'@url()'
                         }],
                         // 作者介绍
                         ahthorIntro:'@paragraph(3)',
                         // 书本介绍
                         bookIntro:'@paragraph(5)',
                         // 书本封面链接
                         cover: '@image(200x280,@color(),png)',
                         // 评分
                         socre:'@natural(0, 5)',
                         //是否喜欢
                         isLike:'@natural(0, 1)'
                    }]
          }]
     });


Mock.mock('http://vtmer.cn/changeUserInfo') 


Mock.mock('http://vtmer.cn/changeUserAvatar',
     {
          'message':'成功'
     }
) 


Mock.mock('http://vtmer.cn/search1',function(r) {
     let str = r.body.split('=');
     return (
          Mock.mock({
               'bookclass':[{
                    'bookInfo|0-5':[{
                         //书的id 
                         'articleId|+1':56,
                         // 书名
                         title:str[1],
                         // 作者
                         author:'@name()',
                         // 出版社
                         publish:'@region()出版社',
                         // 出版时间
                         publishDate:'@date(yyyy-MM-dd)',
                         // 图书馆详情
                         library:[{
                              // 数目
                              total:'@natural(0, 100)',
                              // 位置
                              position:'@natural(2, 7)楼@natural(1,100)架@natural(0, 100)'
                         }],
                         // 书本链接
                         bookUrl:[{
                              doubanUrl:'@url()',
                              zhihuUrl:'@url()'
                         }],
                         // 书本购买链接
                         buyUrl:[{
                              jDUrl:'@url()',
                              DangUrl:'@url()',
                              AmazonUrl:'@url()'
                         }],
                         // 作者介绍
                         ahthorIntro:'@paragraph(3)',
                         // 书本介绍
                         bookIntro:'@paragraph(5)',
                         // 书本封面链接
                         cover: '@image(200x280,@color(),png)',
                         // 评分
                         socre:'@natural(0, 5)',
                         //是否喜欢
                         isLike:'@natural(0, 1)'
                    }]
               }]
          })
     )

},)



Mock.mock('http://vtmer.cn/changeUserAvatar',
     {
          'message':'头像修改成功'
     }
)

Mock.mock('http://vtmer.cn/likeBook',
     {
          'message':'点赞成功'
     }
)

Mock.mock('http://vtmer.cn/collectbook',
     {
          'message':'收藏成功'
     }
)

Mock.mock('http://vtmer.cn/cancleLikeBook',
     {
          'message':'取消点赞成功'
     }
)

Mock.mock('http://vtmer.cn/cancleCollect',
     {
          'message':'取消收藏成功'
     }
)

//收藏
Mock.mock('http://vtmer.cn/collect', {
               // 书的大分类
               'bookclass':[{
                    // 书的详情
                    'bookInfo|0-8':[{
                         //书的id 
                         'articleId|+1':30,
                         // 书名
                         title:'@title(1,5)',
                         // 作者
                         author:'@name()',
                         // 出版社
                         publish:'@region()出版社',
                         // 出版时间
                         publishDate:'@date(yyyy-MM-dd)',
                         // 图书馆详情
                         library:[{
                              // 数目
                              total:'@natural(0, 100)',
                              // 位置
                              position:'@natural(2, 7)楼@natural(1,100)架@natural(0, 100)'
                         }],
                         // 书本链接
                         bookUrl:[{
                              doubanUrl:'@url()',
                              zhihuUrl:'@url()'
                         }],
                         // 书本购买链接
                         buyUrl:[{
                              jDUrl:'@url()',
                              DangUrl:'@url()',
                              AmazonUrl:'@url()'
                         }],
                         // 作者介绍
                         ahthorIntro:'@paragraph(3)',
                         // 书本介绍
                         bookIntro:'@paragraph(5)',
                         // 书本封面链接
                         cover: '@image(200x280,@color(),png)',
                         // 评分
                         socre:'@natural(0, 5)',
                         //是否喜欢
                         isLike:'@natural(0, 1)'
                    }]
          }]
     });


//登录
Mock.mock('http://vtmer.cn/signUp',
{
     
}
)
