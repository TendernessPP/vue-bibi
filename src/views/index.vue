<template>
  <div id="app-index">
    <!--首页头部搜索栏-->
    <app-head-search></app-head-search>
    <!--滚动nav栏-->
    <app-scroll-tab :navList="navList" v-model="active" :item-click="itemClick" font-size="0.28rem"
                    activeColor="#f45a8d" height='0.7rem' margin="0.4rem" ref="scrollTab"></app-scroll-tab>
    <!--body上拉刷新，下拉加载-->
    <div class="body">
      <!--左右滑动，并且与头部nav联动-->
      <app-slide ref="slide" :autoPlay="isAutoPlay" :loop="isLoop" :showDot="isShowDot" :interval="interval"
                 :threshold="threshold" :speed="speed"
                 v-model="active">
        <div v-for="(item,index) in navList" :key="index">
          <!--推荐部分-->
          <div v-if="item.text === '推荐'" class="record">
            <app-scroll :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" v-model="scrollRecord"
                        @pullingUp="scrollUP('record')"
                        @pullingDown="scrollDN('record')">
              <app-slide ref="slide" :autoPlay="isAutoPlayRecord" :loop="isLoopRecord" :showDot="isShowDotRecord"
                         :interval="intervalRecord"
                         :threshold="thresholdRecord" :speed="speedRecord"
                         v-model="activeIndexRecord">
                <div class="imgWrapper" v-for="(item,index) in recordImg" :key="index">
                  <img :src="item.img" alt="">
                </div>
              </app-slide>
              <div class="list-item_wrapper">
                <app-list v-for="(item,index) in recordList" :key="index" :theme="item.theme">
                  <div slot="top" v-if="item.top" class="top">
                    <img :src="item.top.poster" alt="">
                    <div class="desc">
                      <span class="play"><i class="icon-bofang"></i>{{item.top.play}}</span>
                      <span class="comment"><i class="icon-list-1-copy"></i>{{item.top.comment}}</span>
                      <span class="time">{{item.top.time|formatTime}}</span>
                    </div>
                  </div>
                  <span slot="title" v-if="item.title">{{item.title}}</span>
                  <div slot="other" class="other">
                    <div class="other_left"
                         :class="[item.other.description.hot?'is-hot':'',item.other.description.ad?'is-ad':'']">
                      <span class="ad" v-if="item.other.description.ad">广告</span>{{item.other.description.txt}}
                    </div>
                    <div class="other_right"><i class="icon-gengduo"></i></div>
                  </div>
                </app-list>
              </div>
            </app-scroll>
          </div>
          <!--直播部分-->
          <div v-if="item.text === '直播'" class="LiveBroadcast">
            <app-scroll :pullUpLoad="false" :pullDownRefresh="pullDownRefresh" v-model="scrollLiveBroadcast"
                        @pullingUp="scrollUP('LiveBroadcast')"
                        @pullingDown="scrollDN('LiveBroadcast')">
              <app-slide ref="slide" :autoPlay="isAutoPlayLiveBroadcast" :loop="isLoopLiveBroadcast"
                         :showDot="isShowDotLiveBroadcast" :interval="intervalLiveBroadcast"
                         :threshold="thresholdLiveBroadcast" :speed="speedLiveBroadcast"
                         v-model="activeIndexLiveBroadcast">
                <div class="imgWrapper" v-for="(item,index) in recordImg" :key="index">
                  <img :src="item.img" alt="">
                </div>
              </app-slide>
              <div class="label-list">
                <div class="label-list_item" v-for="(item,index) in labelList" :key="index">
                  <img :src="item.img" alt="">
                  <span class="txt">{{item.txt}}</span>
                </div>
              </div>
              <div class="list-item_wrapper">
                <div class="recommended-live-broadcast">
                  <div class="head">
                    <span class="top_left">推荐直播</span>
                    <span class="top_right">换一换<i class="icon-shuaxin"></i></span>
                  </div>
                  <div class="body">
                    <app-list v-for="(item,index) in LiveBroadcast" :key="index" :theme="item.theme" :class="item.type==='LiveBroadcast'?'is-LiveBroadcast':''">
                      <div slot="top" v-if="item.top" class="top">
                        <img :src="item.top.poster" alt="">
                        <div class="desc">
                          <span class="name">{{item.top.name}}</span>
                          <span class="fans"><i class="icon-renyuan"></i>{{item.top.fans}}</span>
                        </div>
                      </div>
                      <span slot="title" v-if="item.title">{{item.title}}</span>
                      <div slot="other" class="other">
                        <div class="type">{{item.other.description.type}}</div>
                      </div>
                    </app-list>
                  </div>
                  <div class="recommended-live-broadcast_footer">更多3607个推荐直播<i class="icon-youjiantou"></i></div>
                </div>
                <div class="hour-list">
                  <div class="hour-list_head">
                    <div class="left">
                      <span class="txt">小时榜</span>
                      <span class="time">10:00~11:00</span>
                      <span class="name">总榜排名</span>
                    </div>
                    <div class="right">查看更多<i class="icon-youjiantou"></i></div>
                  </div>
                  <div class="hour-list_item" v-for="(item,index) in hourList" :key="index">
                    <img :src="item.img" alt="">
                    <span class="name">{{item.name}}</span>
                    <span class="type">{{item.type}}</span>
                  </div>
                </div>
                <div class="label-list-wrapper" v-for="(item,index) in labelListBody" :key="index">
                  <div class="label-list_top">
                    <span class="left">{{item.type}}</span>
                    <span class="right">查看更多<i class="icon-youjiantou"></i></span>
                  </div>
                  <div class="label-list_body">
                    <app-list v-for="(list,index) in item.list" :key="index" :theme="list.theme" :class="list.type==='LiveBroadcast'?'is-LiveBroadcast':''">
                      <div slot="top" v-if="list.top" class="top">
                        <img :src="list.top.poster" alt="">
                        <div class="desc">
                          <span class="name">{{list.top.name}}</span>
                          <span class="fans"><i class="icon-renyuan"></i>{{list.top.fans}}</span>
                        </div>
                      </div>
                      <span slot="title" v-if="list.title">{{list.title}}</span>
                      <div slot="other" class="other">
                        <div class="type">{{list.other.description.type}}</div>
                      </div>
                    </app-list>
                  </div>
                </div>
              </div>
            </app-scroll>
          </div>
          <!--热门部分-->
          <div v-if="item.text === '热门'" class="video">
            <app-scroll :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" v-model="scroll"
                        @pullingUp="scrollUP('video')"
                        @pullingDown="scrollDN('video')">
            </app-scroll>
          </div>
          <div v-else>{{item.text}}</div>
        </div>
      </app-slide>
    </div>
    <!--点击列表更多，出现底部弹出框，可以分享，点赞啥的。。。-->
    <div class="popupShow-wrapper">
      <yd-popup v-model="popupShow" position="bottom" maskerOpacity="0.2">
        <div class="popup-content">
          <div class="popup-content_top">
            <app-scroll-tab :navList="popupListUP" v-model="active" font-size="0.24rem"
                            activeColor="#585858" ref="scrollTabPopupTop" icon></app-scroll-tab>
          </div>
          <div class="popup-content_bottom">
            <app-scroll-tab :navList="popupListDown" v-model="active" font-size="0.24rem"
                            activeColor="#585858" ref="scrollTabPopupDown" icon></app-scroll-tab>
          </div>
        </div>
        <a class="cancel" @click="cancel" href="javascript: void(0)">取消</a>
      </yd-popup>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      'app-head-search': require('../../src/components/head-search.vue').default,
      'app-scroll-tab': require('../../src/components/scrollTab/scroll-tab.vue').default,
      'app-scroll': require('../components/scroll/scroll.vue').default,
      'app-list': require('../components/list/list.vue').default,
      'app-slide': require('../components/slider/slide.vue').default
    },
    data() {
      return {
        playerOptions: {
          autoplay: false,
          muted: false,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: 'video/mp4',
            src: 'http://vjs.zencdn.net/v/oceans.mp4'
          }],
          poster: require('../assets/image/700x400.png')
        },
        num: 20,
        typeChannel: false,
        active: 1,
        navList: [
          {
            text: '直播',
            dot: true
          },
          {
            text: '推荐'
          },
          {
            text: '热门'
          },
          {
            text: '追番'
          },
          {
            text: '影视'
          },
          {
            text: '70年'
          }
        ],
        myChannelList: [],
        recommendList: [
          {
            text: '党媒推荐',
            isLong: true
          },
          {
            text: '动物'
          },
          {
            text: '音乐'
          },
          {
            text: '电影'
          },
          {
            text: '科学'
          },
          {
            text: '股票'
          },
          {
            text: '教育'
          },
          {
            text: '家具'
          },
          {
            text: '宠物'
          },
          {
            text: '文化'
          },
          {
            text: '游戏'
          },
          {
            text: '手机'
          },
          {
            text: '钓鱼'
          },
          {
            text: '旅游'
          },
          {
            text: '时尚'
          },
          {
            text: '三农'
          },
          {
            text: '数码'
          },
          {
            text: '影视'
          }
        ],
        btnChannel: true,
        typeScroll: 'UP',
        //上拉刷新滚动加载所需参数
        scroll: 0,
        scrollRecord: 0,
        scrollLiveBroadcast: 0,
        numScroll: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
        pullUpLoad: {
          txt: {
            more: '加载更多...',
            noMore: '~~~啦啦啦,没有更多数据啦！！!'
          },
          threshold: -25
        },
        pullDownRefresh: {
          more: '推荐中',
          success: '',
          threshold: 50,
          stop: 40
        },
        //推荐部分slide
        activeIndexRecord: 0,
        isAutoPlayRecord: true,
        isLoopRecord: true,
        isShowDotRecord: true,
        speedRecord: 400,
        thresholdRecord: 0.3,
        intervalRecord: 4000,
        //直播部分slide
        activeIndexLiveBroadcast: 0,
        isAutoPlayLiveBroadcast: true,
        isLoopLiveBroadcast: true,
        isShowDotLiveBroadcast: true,
        speedLiveBroadcast: 400,
        thresholdLiveBroadcast: 0.3,
        intervalLiveBroadcast: 4000,
        recordImg: [
          {
            img: require('../assets/image/banner_1.jpg')
          },
          {
            img: require('../assets/image/banner_2.jpg')
          }
        ],
        //推荐部分数据
        recordList: [
          {
            id: 1,
            theme: 1,
            title: '今日之中国',
            top: {
              poster: require('../assets/image/700x400.png'),
              play: 4.1,
              comment: 132,
              time: '150'
            },
            other: {
              hot: true,
              description: {
                'txt': '2万点赞',
                'hot': true
              }
            }
          },
          {
            id: 2,
            theme: 1,
            title: '【韩甜甜】六年级小学生唱《飞云之下》声音太美了',
            top: {
              poster: require('../assets/image/700x400.png'),
              play: 4.1,
              comment: 132,
              time: '150'
            },
            other: {
              hot: true,
              description: {
                'txt': '3万点赞',
                'hot': true
              }
            }
          },
          {
            id: 3,
            theme: 1,
            title: '看来这些年我是玩了假的多米诺。。。',
            top: {
              poster: require('../assets/image/700x400.png'),
              play: 4.1,
              comment: 132,
              time: '150'
            },
            other: {
              hot: true,
              description: {
                'txt': '日常.搬运',
                'hot': false
              }
            }
          },
          {
            id: 4,
            theme: 1,
            title: '她什么都没做错 她为什么要在最美的年级凋零',
            top: {
              poster: require('../assets/image/700x400.png'),
              play: 4.1,
              comment: 132,
              time: '150'
            },
            other: {
              hot: true,
              description: {
                'txt': '日常.萌',
                'hot': false
              }
            }
          },
          {
            id: 5,
            theme: 1,
            title: '她什么都没做错 她为什么要在最美的年级凋零',
            top: {
              poster: require('../assets/image/700x400.png'),
              play: 4.1,
              comment: 132,
              time: '150'
            },
            other: {
              hot: true,
              description: {
                'txt': '克苏鲁旅游',
                'ad': true
              }
            }
          },
          {
            id: 6,
            theme: 1,
            title: '今日之中国',
            top: {
              poster: require('../assets/image/700x400.png'),
              play: 4.1,
              comment: 132,
              time: '150'
            },
            other: {
              hot: true,
              description: {
                'txt': '2万点赞',
                'hot': true
              }
            }
          },
          {
            id: 7,
            theme: 1,
            title: '【韩甜甜】六年级小学生唱《飞云之下》声音太美了',
            top: {
              poster: require('../assets/image/700x400.png'),
              play: 4.1,
              comment: 132,
              time: '150'
            },
            other: {
              hot: true,
              description: {
                'txt': '3万点赞',
                'hot': true
              }
            }
          },
          {
            id: 8,
            theme: 1,
            title: '看来这些年我是玩了假的多米诺。。。',
            top: {
              poster: require('../assets/image/700x400.png'),
              play: 4.1,
              comment: 132,
              time: '150'
            },
            other: {
              hot: true,
              description: {
                'txt': '日常.搬运',
                'hot': false
              }
            }
          },
          {
            id: 9,
            theme: 1,
            title: '她什么都没做错 她为什么要在最美的年级凋零',
            top: {
              poster: require('../assets/image/700x400.png'),
              play: 4.1,
              comment: 132,
              time: '150'
            },
            other: {
              hot: true,
              description: {
                'txt': '日常.萌',
                'hot': false
              }
            }
          },
          {
            id: 10,
            theme: 1,
            title: '她什么都没做错 她为什么要在最美的年级凋零',
            top: {
              poster: require('../assets/image/700x400.png'),
              play: 4.1,
              comment: 132,
              time: '150'
            },
            other: {
              hot: true,
              description: {
                'txt': '克苏鲁旅游',
                'ad': true
              }
            }
          }
        ],
        //直播部分数据
        LiveBroadcast: [
          {
            id: 1,
            theme: 1,
            type: 'LiveBroadcast',
            title: '唐老鸭冒险记',
            top: {
              poster: require('../assets/image/700x400.png'),
              name: '萝莉贩卖姬',
              fans: 6621
            },
            other: {
              description: {
                type: '主机游戏'
              }
            }
          },
          {
            id: 2,
            theme: 1,
            type: 'LiveBroadcast',
            title: '鸭梨：三号皇后 龙法多多少少',
            top: {
              poster: require('../assets/image/700x400.png'),
              name: '云朵浅浅撒下鸭梨',
              fans: 6621
            },
            other: {
              description: {
                type: '刀塔自走棋'
              }
            }
          },
          {
            id: 3,
            theme: 1,
            type: 'LiveBroadcast',
            title: '【清晨】 治愈男声吟唱',
            top: {
              poster: require('../assets/image/700x400.png'),
              name: '迷路的牙刷',
              fans: 6621
            },
            other: {
              description: {
                type: '唱见电台'
              }
            }
          },
          {
            id: 4,
            theme: 1,
            type: 'LiveBroadcast',
            title: '连续一个月联播14个小时，三生三世',
            top: {
              poster: require('../assets/image/700x400.png'),
              name: '硬碟君',
              fans: 6621
            },
            other: {
              description: {
                type: '无限法则'
              }
            }
          },
          {
            id: 5,
            theme: 1,
            type: 'LiveBroadcast',
            title: '唐老鸭冒险记',
            top: {
              poster: require('../assets/image/700x400.png'),
              name: '萝莉贩卖姬',
              fans: 6621
            },
            other: {
              description: {
                type: '主机游戏'
              }
            }
          },
          {
            id: 6,
            theme: 1,
            type: 'LiveBroadcast',
            title: '唐老鸭冒险记',
            top: {
              poster: require('../assets/image/700x400.png'),
              name: '萝莉贩卖姬',
              fans: 6621
            },
            other: {
              description: {
                type: '主机游戏'
              }
            }
          }
        ],
        labelList: [
          {
            img: require('../assets/image/80x80.png'),
            txt: '英雄联盟'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '第五人格'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '王者荣耀'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '娱乐'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '电台'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '绝地求生'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '全面战争:三国'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '明日方舟'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '守望先锋'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '全部标签'
          }
        ],
        hourList: [
          {
            img: require('../assets/image/80x80.png'),
            name: '我不是怪物啊啊啊啊',
            type: 'APEX英雄'
          },
          {
            img: require('../assets/image/80x80.png'),
            name: 'Chester00',
            type: '守望先锋'
          },
          {
            img: require('../assets/image/80x80.png'),
            name: '阿基米德',
            type: '视频聊天'
          }
        ],
        labelListBody: [
          {
            type: '电台',
            list: [
              {
                id: 1,
                theme: 1,
                type: 'LiveBroadcast',
                title: '唐老鸭冒险记',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '萝莉贩卖姬',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '主机游戏'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                type: 'LiveBroadcast',
                title: '鸭梨：三号皇后 龙法多多少少',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '云朵浅浅撒下鸭梨',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '刀塔自走棋'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                type: 'LiveBroadcast',
                title: '【清晨】 治愈男声吟唱',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '迷路的牙刷',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '唱见电台'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                type: 'LiveBroadcast',
                title: '连续一个月联播14个小时，三生三世',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '硬碟君',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '无限法则'
                  }
                }
              }
            ]
          },
          {
            type: '视频唱见',
            list: [
              {
                id: 1,
                theme: 1,
                type: 'LiveBroadcast',
                title: '唐老鸭冒险记',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '萝莉贩卖姬',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '主机游戏'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                type: 'LiveBroadcast',
                title: '鸭梨：三号皇后 龙法多多少少',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '云朵浅浅撒下鸭梨',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '刀塔自走棋'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                type: 'LiveBroadcast',
                title: '【清晨】 治愈男声吟唱',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '迷路的牙刷',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '唱见电台'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                type: 'LiveBroadcast',
                title: '连续一个月联播14个小时，三生三世',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '硬碟君',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '无限法则'
                  }
                }
              }
            ]
          },
          {
            type: '第五人格',
            list: [
              {
                id: 1,
                theme: 1,
                type: 'LiveBroadcast',
                title: '唐老鸭冒险记',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '萝莉贩卖姬',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '主机游戏'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                type: 'LiveBroadcast',
                title: '鸭梨：三号皇后 龙法多多少少',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '云朵浅浅撒下鸭梨',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '刀塔自走棋'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                type: 'LiveBroadcast',
                title: '【清晨】 治愈男声吟唱',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '迷路的牙刷',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '唱见电台'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                type: 'LiveBroadcast',
                title: '连续一个月联播14个小时，三生三世',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '硬碟君',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '无限法则'
                  }
                }
              }
            ]
          },
          {
            type: '王者荣耀',
            list: [
              {
                id: 1,
                theme: 1,
                type: 'LiveBroadcast',
                title: '唐老鸭冒险记',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '萝莉贩卖姬',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '主机游戏'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                type: 'LiveBroadcast',
                title: '鸭梨：三号皇后 龙法多多少少',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '云朵浅浅撒下鸭梨',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '刀塔自走棋'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                type: 'LiveBroadcast',
                title: '【清晨】 治愈男声吟唱',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '迷路的牙刷',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '唱见电台'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                type: 'LiveBroadcast',
                title: '连续一个月联播14个小时，三生三世',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '硬碟君',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '无限法则'
                  }
                }
              }
            ]
          },
          {
            type: '网游',
            list: [
              {
                id: 1,
                theme: 1,
                type: 'LiveBroadcast',
                title: '唐老鸭冒险记',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '萝莉贩卖姬',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '主机游戏'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                type: 'LiveBroadcast',
                title: '鸭梨：三号皇后 龙法多多少少',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '云朵浅浅撒下鸭梨',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '刀塔自走棋'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                type: 'LiveBroadcast',
                title: '【清晨】 治愈男声吟唱',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '迷路的牙刷',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '唱见电台'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                type: 'LiveBroadcast',
                title: '连续一个月联播14个小时，三生三世',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '硬碟君',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '无限法则'
                  }
                }
              }
            ]
          },
          {
            type: '手游',
            list: [
              {
                id: 1,
                theme: 1,
                type: 'LiveBroadcast',
                title: '唐老鸭冒险记',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '萝莉贩卖姬',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '主机游戏'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                type: 'LiveBroadcast',
                title: '鸭梨：三号皇后 龙法多多少少',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '云朵浅浅撒下鸭梨',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '刀塔自走棋'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                type: 'LiveBroadcast',
                title: '【清晨】 治愈男声吟唱',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '迷路的牙刷',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '唱见电台'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                type: 'LiveBroadcast',
                title: '连续一个月联播14个小时，三生三世',
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '硬碟君',
                  fans: 6621
                },
                other: {
                  description: {
                    type: '无限法则'
                  }
                }
              }
            ]
          }
        ],
        popupShow: false,
        //底部弹出层
        popupListUP: [
          {
            icon: 'icon-tuwen',
            text: '转发到头条'
          },
          {
            icon: 'icon-tuwen',
            text: '微信'
          },
          {
            icon: 'icon-tuwen',
            text: '朋友圈'
          },
          {
            icon: 'icon-tuwen',
            text: '钉钉'
          },
          {
            icon: 'icon-tuwen',
            text: 'QQ'
          },
          {
            icon: 'icon-tuwen',
            text: 'QQ空间'
          },
          {
            icon: 'icon-tuwen',
            text: '系统分享'
          },
          {
            icon: 'icon-tuwen',
            text: '复制链接'
          }
        ],
        popupListDown: [
          {
            icon: 'icon-tuwen',
            text: '帮上头条'
          },
          {
            icon: 'icon-tuwen',
            text: '收藏'
          },
          {
            icon: 'icon-tuwen',
            text: '不感兴趣'
          },
          {
            icon: 'icon-tuwen',
            text: '顶'
          },
          {
            icon: 'icon-tuwen',
            text: '踩'
          },
          {
            icon: 'icon-tuwen',
            text: '举报'
          }
        ],
        //app-slider
        turnToPrev: false,
        turnToNext: false,
        isAutoPlay: false,
        isLoop: false,
        isShowDot: false,
        speed: 400,
        threshold: 0.3,
        interval: 4000
      }
    },
    computed: {
      btnChange() {
        return this.btnChannel === true ? '编辑' : '完成'
      },
      chanelTxt() {
        return this.btnChannel === true ? '点击进入频道' : '拖拽可进行排序'
      }
    },
    methods: {
      onPlayerPlay(player, item) {
        console.log(item)
        this.$set(item, 'videoShow', true)
        console.log('player play!', player)
      },
      onPlayerPause(player) {
        console.log('player pause!', player)
      },
      //推荐广告下载
      goDownLoad() {
        this.$dialog.toast(
          {
            mes: '下载成功',
            timeout: 1500,
            icon: 'success'
          }
        )
      },
      //左右滑动改变
      activeChange(val) {
        // console.log(val, this.active)
        this.active = val
      },
      //底部弹出框关闭
      cancel() {
        this.popupShow = false
      },
      //打开底部弹出框
      clickOperating() {
        this.popupShow = true
      },
      //nav导航栏，点击
      itemClick(val) {
        // console.log(val)
      },
      //我的频道，切换
      btnClk() {
        this.btnChannel = !this.btnChannel
      },
      //更新数据
      async getPostList(type) {
        let self = this
        // let num = Math.random() * 10
        let num = 8
        let _list = []
        let count = parseInt(num)
        switch (type) {
          case 'video':
            while (count--) {
              _list.push(this.bodyList[count])
            }
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num > 5) {
                self.bodyList = [...self.bodyList, {theme: 1, time: 45}, ..._list]
                self.scroll < 0 ? self.scroll = 1 : self.scroll++
              } else if (this.typeScroll === 'UP' && num <= 5) {
                self.scroll === 0 ? self.scroll-- : self.scroll = 0
              } else if (this.typeScroll === 'DN' && num > 5) {
                self.scroll <= 0 ? self.scroll-- : self.scroll++
                self.bodyList = [..._list, {theme: 1, time: 45}, ...self.bodyList]
                self.$set(this.pullDownRefresh, 'success', `已为您更新${_list.length}条数据！！！`)
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scroll <= 0 ? self.scroll-- : self.scroll++
                self.$set(this.pullDownRefresh, 'success', '已是最新数据！！！')
              }
            }, 1500)
            break
          case 'record':
            while (count--) {
              _list.push(this.recordList[count])
            }
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num > 5) {
                console.log(_list)
                self.recordList = [...self.recordList, ..._list]
                self.scrollRecord < 0 ? self.scrollRecord = 1 : self.scrollRecord++
              } else if (this.typeScroll === 'UP' && num <= 5) {
                self.scrollRecord === 0 ? self.scrollRecord-- : self.scrollRecord = 0
              } else if (this.typeScroll === 'DN' && num > 5) {
                self.scrollRecord <= 0 ? self.scrollRecord-- : self.scrollRecord++
                self.recordList = [..._list, ...self.recordList]
                self.$set(this.pullDownRefresh, 'success', `已为您更新${_list.length}条数据！！！`)
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scrollRecord <= 0 ? self.scrollRecord-- : self.scrollRecord++
                self.$set(this.pullDownRefresh, 'success', '已是最新数据！！！')
              }
            }, 1500)
            break
          case 'LiveBroadcast':
            while (count-- && count-- > 1) {
              _list.push(this.LiveBroadcast[count])
            }
            console.log(_list, num)
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num > 5) {
                self.LiveBroadcast = [...self.LiveBroadcast, {theme: 1, time: 45}, ..._list]
                self.scrollLiveBroadcast < 0 ? self.scrollLiveBroadcast = 1 : self.scrollLiveBroadcast++
              } else if (this.typeScroll === 'UP' && num <= 5) {
                self.scrollLiveBroadcast === 0 ? self.scrollLiveBroadcast-- : self.scrollLiveBroadcast = 0
              } else if (this.typeScroll === 'DN' && num > 5) {
                self.scrollLiveBroadcast <= 0 ? self.scrollLiveBroadcast-- : self.scrollLiveBroadcast++
                self.LiveBroadcast = [..._list, {theme: 1, time: 45}, ...self.LiveBroadcast]
                self.$set(this.pullDownRefresh, 'success', `已为您更新${_list.length}条数据！！！`)
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scrollLiveBroadcast <= 0 ? self.scrollLiveBroadcast-- : self.scrollLiveBroadcast++
                self.$set(this.pullDownRefresh, 'success', '已是最新数据！！！')
              }
            }, 1500)
            break
        }
      },
      //上拉加载
      scrollUP(type) {
        this.typeScroll = 'UP'
        switch (type) {
          case 'video':
            this.getPostList(type)
            break
          case 'record':
            this.getPostList(type)
            break
          case 'LiveBroadcast':
            this.getPostList(type)
            break
        }
      },
      //下拉刷新
      scrollDN(type) {
        this.typeScroll = 'DN'
        switch (type) {
          case 'video':
            this.getPostList(type)
            break
          case 'record':
            this.getPostList(type)
            break
          case 'LiveBroadcast':
            this.getPostList(type)
            break
        }
      },
      //频道删除
      channelDelete(item, index) {
        this.navList.splice(index, 1)
        this.recommendList.unshift(item)
      },
      //增加频道
      addChannel(item, index) {
        this.navList.push(item)
        this.recommendList.splice(index, 1)
      }
    },
    created() {
      this.$nextTick(() => {
      })
    },
    filters: {
      filterComment(val) {
        return val === 0 ? '关注' : '取消关注'
      },
      formatTime(val) {
        let secondTime = parseInt(val)// 秒
        let minuteTime = 0// 分
        let hourTime = 0// 小时
        if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
          //获取分钟，除以60取整数，得到整数分钟
          minuteTime = parseInt(secondTime / 60)
          //获取秒数，秒数取佘，得到整数秒数
          secondTime = parseInt(secondTime % 60)
          //如果分钟大于60，将分钟转换成小时
          if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60)
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60)
          }
        }
        let result = ''
        if (secondTime >= 10) {
          result = '' + parseInt(secondTime)
        } else {
          result = '0' + parseInt(secondTime)
        }
        if (minuteTime && minuteTime > 0) {
          minuteTime >= 10 ? result = '' + parseInt(minuteTime) + ':' + result : result = '0' + parseInt(minuteTime) + ':' + result
        } else {
          result = '00' + ':' + result
        }
        if (hourTime && hourTime > 0) {
          hourTime >= 10 ? result = '' + parseInt(hourTime) + ':' + result : result = '0' + parseInt(hourTime) + ':' + result
        }
        return result
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../assets/styl/mixin.styl"
  #app-index
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif
    width: 100%
    position: absolute
    top: 0
    bottom: 0.91rem
    /deep/ .scroll-box
      -font-weight: 500
    //box-shadow: -2px 0px 0px rgba(0,0,0,0.8);
    .body
      height: calc(100% - 1.5rem)
      overflow: hidden
      .record
        .scroll-content
          //padding: 0.1rem 0.1rem 0
          .list-item_wrapper
            display: flex
            flex-wrap: wrap
            padding: 0 0.2rem
            .app-list-theme1
              flex: 0 0 49%
              border-radius: 10px
              &:nth-child(odd)
                margin-right: 2%
          .slide
            height: auto
            margin-top: 0.2rem
            /deep/ .dots
              position relative
              bottom: 15px
              width: 100%
              display: flex
              justify-content: flex-end
              padding-right: 0.4rem
            .imgWrapper
              padding: 0 0.2rem
              > img
                width: 100%
                border-radius: 4px
      .LiveBroadcast
        .scroll-content
          //padding: 0.1rem 0.1rem 0
          .list-item_wrapper
            .recommended-live-broadcast
              padding: 0 0.2rem
              .head
                height: 0.9rem
                display: flex
                justify-content: space-between
                align-items: center
                .top_right
                  display: flex
                  align-items: center
                  color: rgba(0, 0, 0, .6)
                  i
                    margin-left: 0.06rem
                    font-size: 0.4rem
              .body
                display: flex
                flex-wrap: wrap
                .app-list-theme1
                  flex: 0 0 49%
                  border-radius: 10px
                  &:nth-child(odd)
                    margin-right: 2%
              .recommended-live-broadcast_footer
                height: 0.9rem
                display: flex
                align-items: center
                justify-content: center
                color: #f45a8d
                position: relative
                &:after
                  height: 1px
                  position: absolute
                  bottom: 0
                  left: 0
                  content: ''
                  width: 100%
                  background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
            .hour-list
              padding: 0.3rem 0.2rem
              display: flex
              flex-wrap: wrap
              position: relative
              &:after
                height: 1px
                position: absolute
                bottom: 0
                left: 0
                content: ''
                width: 100%
                background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
              .hour-list_head
                height: 0.9rem
                width: 100%
                display: flex
                justify-content: space-between
                align-items: center
                .left
                  .txt
                    font-weight: 600
                    font-size: 0.26rem
                  .time,.name
                    color: rgba(0,0,0,.6)
                    margin-left: 0.08rem
                .right
                  display: flex
                  align-items: center
                  color: rgba(0,0,0,.6)
                  i
                    font-size: 0.4rem
              .hour-list_item
                flex: 0 0 33.3%
                display: flex
                flex-direction: column
                align-items: center
                img
                  width: 60%
                  border-radius: 50%
                .name
                  display: inline-block
                  width: 80%
                  text-overflow ellipsis
                  overflow: hidden
                  white-space nowrap
                  margin-top: 0.1rem
                .type
                  color: rgba(0,0,0,.6)
                  font-size: 0.24rem
                  transform: scale(0.8)
                  margin-top: 0.1rem
            .label-list-wrapper
              position: relative
              padding-bottom: 0.2rem
              &:after
                height: 1px
                position: absolute
                bottom: 0
                left: 0
                content: ''
                width: 100%
                background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
              .label-list_top
                height: 0.9rem
                padding: 0 0.2rem
                display: flex
                justify-content: space-between
                align-items: center
                .left
                  font-weight: 600
                .right
                  color: rgba(0,0,0,.6)
                  display: flex
                  align-items: center
                  i
                      font-size: 0.4rem
              .label-list_body
                padding: 0 0.2rem
                display: flex
                flex-wrap: wrap
                .app-list-theme1
                  flex: 0 0 49%
                  border-radius: 10px
                  &:nth-child(odd)
                    margin-right: 2%
          .slide
            height: auto
            margin-top: 0.2rem
            /deep/ .dots
              position relative
              bottom: 15px
              width: 100%
              display: flex
              justify-content: flex-end
              padding-right: 0.4rem
            .imgWrapper
              padding: 0 0.2rem
              > img
                width: 100%
                border-radius: 4px
          .label-list
            display: flex
            flex-wrap: wrap
            padding: 0 0.2rem 0.2rem
            position: relative
            &:after
              height: 1px
              position: absolute
              bottom: 0
              left: 0
              content: ''
              width: 100%
              background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
            .label-list_item
              flex: 0 0 20%
              overflow: hidden
              display: flex
              flex-direction: column
              justify-content: space-between
              align-items: center
              img
                width: 50%
              .txt
                display: inline-block
                width: 100%
                word-wrap: normal
                text-overflow: ellipsis
                white-space: nowrap
                overflow: hidden
                margin-top: 0.12rem
                margin-bottom: 0.12rem
      .slide
        height: 100%
        /deep/ .slide-group
          height: 100%
          .slide-item
            height: 100%
            > div
              height: 100%
      .yd-slider
        height: 100%
      .list-bottom
        height: 0.9rem
        display: flex
        align-items: center
        justify-content: space-between
        padding: 0 0.2rem
        background-color: #fff
        .list-bottom_left
          display: flex
          align-items: center
          .avata
            display: inline-block
            width: 0.6rem
            padding: 0.3rem 0
            height: 0
            overflow: hidden
            border-radius: 50%
            > img
              display: block
              width: 100%
              background-color: #FFF
              border: none
              margin-top: -50%
          .name
            display: inline-block
            padding: 0 0.1rem
            position: relative
            color: #080808
            font-weight: 600
            &:after
              content: ''
              position: absolute
              top: 0
              right: 0
              width: 1px
              height: 100%
              background-image: linear-gradient(to right, #ccc 50%, transparent 50%)
          .attention
            color: #ed4040
            display: inline-block
            padding: 0 0.1rem
        .list-bottom_right
          display: flex
          .comment
            margin-right: 0.2rem
            position: relative
            top: -0.04rem
            .icon-62
              margin-right: 0.1rem
              font-size: 0.4rem
      .prompt
        background-color: #E3E3E3
        justify-content: center
        color: #117EEE
        padding: 0.2rem 0
        display: flex
        align-items: center
        .icon-shuaxin
          font-size: 0.30rem
    .popupShow-wrapper
      /deep/ .yd-popup-show
        background-color: transparent
        padding-bottom: 0.2rem
        .popup-content, .cancel
          background-color: #fff
          width: 95%
          margin: 0 auto
          border-radius: 4px
        .popup-content
          .popup-content_top
            padding: 0.5rem 0.2rem
            border-1px(#e5e5e5)
            .scroll-box
              border-none()
          .popup-content_bottom
            padding: 0.5rem 0.2rem
            .scroll-box
              border-none()
        .cancel
          display: block
          margin-top: 0.2rem
          text-align: center
          font-size: 0.30rem
          padding: 0.3rem 0
</style>
