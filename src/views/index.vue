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
                  <div class="recommended-live-broadcast_head">
                    <span class="top_left">推荐直播</span>
                    <span class="top_right">换一换<i class="icon-shuaxin"></i></span>
                  </div>
                  <div class="recommended-live-broadcast_body">
                    <app-list v-for="(item,index) in LiveBroadcast" :key="index" :theme="item.theme"
                              :class="item.special?'is-special':''">
                      <div slot="top" v-if="item.top" class="app-list-item_top">
                        <img :src="item.top.poster" alt="">
                        <div class="desc">
                          <span class="name">{{item.top.name}}</span>
                          <span class="fans"><i class="icon-renyuan"></i>{{item.top.fans}}</span>
                        </div>
                      </div>
                      <div slot="body" v-if="item.body" class="app-list-item_body">{{item.body.title}}</div>
                      <div slot="other" class="app-list-item_other">
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
                    <app-list v-for="(list,index) in item.list" :key="index" :theme="list.theme"
                              :class="list.special?'is-special':''">
                      <div slot="top" v-if="list.top" class="app-list-item_top">
                        <img :src="list.top.poster" alt="">
                        <div class="desc">
                          <span class="name">{{list.top.name}}</span>
                          <span class="fans"><i class="icon-renyuan"></i>{{list.top.fans}}</span>
                        </div>
                      </div>
                      <span slot="body" v-if="list.body" class="app-list-item_body">{{list.body.title}}</span>
                      <div slot="other" v-if="list.other" class="app-list-item_other">
                        <div class="type">{{list.other.description.type}}</div>
                      </div>
                    </app-list>
                  </div>
                </div>
              </div>
            </app-scroll>
          </div>
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
                  <div slot="top" v-if="item.top" class="app-list-item_top">
                    <img :src="item.top.poster" alt="">
                    <div class="desc">
                      <span class="play"><i class="icon-bofang"></i>{{item.top.play}}</span>
                      <span class="comment"><i class="icon-list-1-copy"></i>{{item.top.comment}}</span>
                      <span class="time">{{item.top.time | formatTime}}</span>
                    </div>
                  </div>
                  <span slot="body" v-if="item.title" class="app-list-item_body">{{item.title}}</span>
                  <div slot="other" class="app-list-item_other">
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
          <!--热门部分-->
          <div v-if="item.text === '热门'" class="popular">
            <app-scroll :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" v-model="scrollPopular"
                        @pullingUp="scrollUP('popular')"
                        @pullingDown="scrollDN('popular')">
              <div class="popular-head">
                <span class="popular-head_item">
                  <i class="icon-PCbofangye_paihangbang" style="font-size: 0.4rem;color: red;margin-right: 0.08rem"></i>排行榜
                </span>
                <span class="popular-head_item">
                  <i class="icon-B-xialaliebiao"
                     style="font-size: 0.42rem;color: greenyellow;margin-right: 0.08rem"></i>每周必看
                </span>
              </div>
              <div class="list-item_wrapper">
                <app-list v-for="(item,index) in popularList" :key="index" :theme="item.theme">
                  <div slot="top" v-if="item.top" class="app-list-item_top">
                    <img :src="item.top.poster" alt="">
                    <div class="desc">
                      <span class="time">{{item.top.time|formatTime}}</span>
                    </div>
                  </div>
                  <div slot="top" v-if="item.body" class="app-list-item_body">
                    <div class="title">{{item.body.title}}</div>
                    <div class="type"><span class="txt"
                                            :class="{'is-hot':item.body.type.hot}">{{item.body.type.txt}}</span></div>
                    <div class="name">{{item.body.name}}</div>
                    <div class="seeAndTimeWrapper">
                      <div class="seeAndTime">
                        <span class="see">{{item.body.see}}万观看</span>
                        <span class="time">{{item.body.time}}</span>
                      </div>
                      <i class="icon-gengduo"></i>
                    </div>
                  </div>
                </app-list>
              </div>
            </app-scroll>
          </div>
          <!--追番-->
          <div v-if="item.text === '追番'" class="chasing">
            <app-scroll :pullUpLoad="false" :pullDownRefresh="pullDownRefresh" v-model="scrollChasing"
                        @pullingUp="scrollUP('chasing')"
                        @pullingDown="scrollDN('chasing')">
              <app-slide ref="slide" :autoPlay="isAutoPlayChasing" :loop="isLoopChasing" :showDot="isShowDotChasing"
                         :interval="intervalChasing"
                         :threshold="thresholdChasing" :speed="speedChasing"
                         v-model="activeIndexChasing">
                <div class="imgWrapper" v-for="(item,index) in chasingImg" :key="index">
                  <img :src="item.img" alt="">
                </div>
              </app-slide>
              <div class="head-list">
                <div class="head-list_item" v-for="(item,index) in chasingHeadList" :key="index">
                  <img :src="item.img" alt="">
                  <span class="txt">{{item.txt}}</span>
                </div>
              </div>
              <div class="label-list-wrapper" v-for="(item,index) in ChasingLabelListBody" :key="index">
                <div class="label-list_top">
                  <span class="left">{{item.type}}</span>
                  <span class="right">查看更多<i class="icon-youjiantou"></i></span>
                </div>
                <div class="label-list_body">
                  <app-list v-for="(list,index) in item.list" :key="index" :theme="list.theme"
                            :class="list.type==='LiveBroadcast'?'is-LiveBroadcast':''">
                    <div slot="top" v-if="list.top" class="app-list-item_top">
                      <img :src="list.top.poster" alt="">
                      <div class="desc">
                        <i class="icon-02" v-if="list.top.love"></i>
                        <span class="member" v-if="list.top.member">会员抢先</span>
                      </div>
                    </div>
                    <div slot="body" v-if="list.body">{{list.body.title}}</div>
                    <div slot="other" class="app-list-item_other">
                      <div class="type">{{list.other.description.type}}</div>
                    </div>
                  </app-list>
                </div>
              </div>
              <div style="height: 0.2rem"></div>
            </app-scroll>
          </div>
          <!--影视部分-->
          <div v-if="item.text === '影视'" class="movie">
            <app-scroll :pullUpLoad="false" :pullDownRefresh="pullDownRefresh" v-model="scrollMovie"
                        @pullingUp="scrollUP('movie')"
                        @pullingDown="scrollDN('movie')">
              <app-slide ref="slide" :autoPlay="isAutoPlayMovie" :loop="isLoopMovie" :showDot="isShowDotMovie"
                         :interval="intervalMovie"
                         :threshold="thresholdMovie" :speed="speedMovie"
                         v-model="activeIndexMovie">
                <div class="imgWrapper" v-for="(item,index) in movieImg" :key="index">
                  <img :src="item.img" alt="">
                </div>
              </app-slide>
              <div class="head-list">
                <div class="head-list_item" v-for="(item,index) in headList" :key="index">
                  <img :src="item.img" alt="">
                  <span class="txt">{{item.txt}}</span>
                </div>
              </div>
              <div class="label-list-wrapper" v-for="(item,index) in MovieLabelListBody" :key="index">
                <div class="label-list_top">
                  <span class="left">{{item.type}}</span>
                  <span class="right">查看更多<i class="icon-youjiantou"></i></span>
                </div>
                <div class="label-list_body">
                  <app-list v-for="(list,index) in item.list" :key="index" :theme="list.theme"
                            :class="list.special?'is-special':''">
                    <div slot="top" v-if="list.top" class="app-list-item_top">
                      <img :src="list.top.poster" alt="">
                      <div class="desc">
                        <i class="icon-02" v-if="list.top.love"></i>
                        <span class="member" v-if="list.top.member">会员抢先</span>
                      </div>
                    </div>
                    <div slot="body" v-if="list.body" class="app-list-item_body">{{list.body.title}}</div>
                    <div slot="other" class="app-list-item_other">
                      <div class="type">{{list.other.description.type}}</div>
                    </div>
                  </app-list>
                </div>
              </div>
              <div class="relatedSuggestion">
                <div class="relatedSuggestion_head">影视相关推荐</div>
                <app-list v-for="(item,index) in relatedSuggestionList" :key="index" :theme="item.theme">
                  <div slot="top" v-if="item.top" class="app-list-item_top">
                    <img :src="item.top.poster" alt="">
                  </div>
                  <div slot="body" v-if="item.body" class="app-list-item_body">
                    <div class="title">{{item.body.title}}</div>
                    <div class="name">{{item.body.name}}</div>
                  </div>
                </app-list>
              </div>
              <div class="comingSoon">
                <div class="comingSoon_head">即将开播</div>
                <div class="comingSoon_content">
                  <app-scroll-not-tab>
                    <app-scroll-not-tab-item v-for="(item,index) in comingSoonList" :key="index">
                      <div class="comingSoon_content-item">
                        <div class="item_head">
                          <span class="line special"></span>
                          <span class="time">{{item.time}}</span>
                          <span class="line"></span>
                        </div>
                        <div class="item_body">
                          <img :src="item.img" alt="">
                          <span class="type" v-if="item.type">会员抢先</span>
                          <span class="fans">{{item.fans}}人追剧</span>
                        </div>
                        <div class="item_footer">
                          <span class="name">{{item.name}}</span>
                          <yd-button bgcolor="#fff" color="#f45a8d"><i class="icon-02" style="font-size: 0.36rem"></i>追剧
                          </yd-button>
                        </div>
                      </div>
                    </app-scroll-not-tab-item>
                  </app-scroll-not-tab>
                </div>
              </div>
              <div class="exclusivePlanning">
                <div class="exclusivePlanning_head">
                  <div class="exclusivePlanning_left">独家策划</div>
                  <div class="exclusivePlanning_right">查看更多<i class="icon-youjiantou" style="font-size: 0.4rem"></i>
                  </div>
                </div>
                <div class="exclusivePlanning_content">
                  <div class="exclusivePlanning_content-item" v-for="(item,index) in exclusivePlanningList"
                       :key="index">
                    <img :src="item.img" alt="">
                    <span class="name">{{item.name}}</span>
                    <span class="time" v-if="item.time">第{{item.time}}期</span>
                    <span class="txt" v-if="item.txt">{{item.txt}}</span>
                  </div>
                </div>
              </div>
              <div style="height: 0.2rem"></div>
            </app-scroll>
          </div>
        </div>
      </app-slide>
    </div>
    <div class="me-broadcast-live" v-if="active===0">
      <a href="javascript:void(0)">我要<br>直播</a>
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
      'app-slide': require('../components/slider/slide.vue').default,
      'app-scroll-not-tab': require('../components/scrollNotTab/scroll-not-tab.vue').default,
      'app-scroll-not-tab-item': require('../components/scrollNotTab/scroll-not-tab-item.vue').default
    },
    data() {
      return {
        num: 30,
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
        typeScroll: 'UP',
        //上拉刷新滚动加载所需参数
        scrollRecord: 0,
        scrollLiveBroadcast: 0,
        scrollPopular: 0,
        scrollMovie: 0,
        scrollChasing: 0,
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
        //影视部分slide
        activeIndexMovie: 0,
        isAutoPlayMovie: true,
        isLoopMovie: true,
        isShowDotMovie: true,
        speedMovie: 400,
        thresholdMovie: 0.3,
        intervalMovie: 4000,
        //追番部分slide
        activeIndexChasing: 0,
        isAutoPlayChasing: true,
        isLoopChasing: true,
        isShowDotChasing: true,
        speedChasing: 400,
        thresholdChasing: 0.3,
        intervalChasing: 4000,
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
            special: true,
            top: {
              poster: require('../assets/image/700x400.png'),
              name: '萝莉贩卖姬',
              fans: 6621
            },
            body: {
              title: '唐老鸭冒险记'
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
            special: true,
            top: {
              poster: require('../assets/image/700x400.png'),
              name: '云朵浅浅撒下鸭梨',
              fans: 6621
            },
            body: {
              title: '鸭梨：三号皇后 龙法多多少少'
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
            special: true,
            top: {
              poster: require('../assets/image/700x400.png'),
              name: '迷路的牙刷',
              fans: 6621
            },
            body: {
              title: '连续一个月联播14个小时，三生三世'
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
            special: true,
            top: {
              poster: require('../assets/image/700x400.png'),
              name: '硬碟君',
              fans: 6621
            },
            body: {
              title: '连续一个月联播14个小时，三生三世'
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
            special: true,
            top: {
              poster: require('../assets/image/700x400.png'),
              name: '萝莉贩卖姬',
              fans: 6621
            },
            body: {
              title: '唐老鸭冒险记'
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
            special: true,
            top: {
              poster: require('../assets/image/700x400.png'),
              name: '萝莉贩卖姬',
              fans: 6621
            },
            body: {
              title: '唐老鸭冒险记'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '萝莉贩卖姬',
                  fans: 6621
                },
                body: {
                  title: '唐老鸭冒险记'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '云朵浅浅撒下鸭梨',
                  fans: 6621
                },
                body: {
                  title: '鸭梨：三号皇后 龙法多多少少'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '迷路的牙刷',
                  fans: 6621
                },
                body: {
                  title: '【清晨】 治愈男声吟唱'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '硬碟君',
                  fans: 6621
                },
                body: {
                  title: '连续一个月联播14个小时，三生三世'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '萝莉贩卖姬',
                  fans: 6621
                },
                body: {
                  title: '唐老鸭冒险记'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '云朵浅浅撒下鸭梨',
                  fans: 6621
                },
                body: {
                  title: '鸭梨：三号皇后 龙法多多少少'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '迷路的牙刷',
                  fans: 6621
                },
                body: {
                  title: '【清晨】 治愈男声吟唱'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '硬碟君',
                  fans: 6621
                },
                body: {
                  title: '连续一个月联播14个小时，三生三世'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '萝莉贩卖姬',
                  fans: 6621
                },
                body: {
                  title: '唐老鸭冒险记'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '云朵浅浅撒下鸭梨',
                  fans: 6621
                },
                body: {
                  title: '鸭梨：三号皇后 龙法多多少少'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '迷路的牙刷',
                  fans: 6621
                },
                body: {
                  title: '【清晨】 治愈男声吟唱'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '硬碟君',
                  fans: 6621
                },
                body: {
                  title: '连续一个月联播14个小时，三生三世'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '萝莉贩卖姬',
                  fans: 6621
                },
                body: {
                  title: '唐老鸭冒险记'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '云朵浅浅撒下鸭梨',
                  fans: 6621
                },
                body: {
                  title: '鸭梨：三号皇后 龙法多多少少'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '迷路的牙刷',
                  fans: 6621
                },
                body: {
                  title: '【清晨】 治愈男声吟唱'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '硬碟君',
                  fans: 6621
                },
                body: {
                  title: '连续一个月联播14个小时，三生三世'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '萝莉贩卖姬',
                  fans: 6621
                },
                body: {
                  title: '唐老鸭冒险记'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '云朵浅浅撒下鸭梨',
                  fans: 6621
                },
                body: {
                  title: '鸭梨：三号皇后 龙法多多少少'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '迷路的牙刷',
                  fans: 6621
                },
                body: {
                  title: '【清晨】 治愈男声吟唱'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '硬碟君',
                  fans: 6621
                },
                body: {
                  title: '连续一个月联播14个小时，三生三世'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '萝莉贩卖姬',
                  fans: 6621
                },
                body: {
                  title: '唐老鸭冒险记'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '云朵浅浅撒下鸭梨',
                  fans: 6621
                },
                body: {
                  title: '鸭梨：三号皇后 龙法多多少少'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '迷路的牙刷',
                  fans: 6621
                },
                body: {
                  title: '【清晨】 治愈男声吟唱'
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
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  name: '硬碟君',
                  fans: 6621
                },
                body: {
                  title: '连续一个月联播14个小时，三生三世'
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
        //热门数据
        popularList: [
          {
            id: 1,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png'),
              time: 520
            },
            body: {
              title: '【短评】 王者荣耀kpl决赛舞台倒塌折射出国内电竞产业多种问题啊啊啊啊啊啊啊',
              type: {
                txt: '新上榜',
                hot: true
              },
              name: '芒果冰ol',
              see: 60.7,
              time: '17小时前'
            }
          },
          {
            id: 2,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png'),
              time: 110
            },
            body: {
              title: '大sao包了4斤粽子，咸肉蛋黄蜜枣，和儿子一起吃三口',
              type: {},
              name: '徐大sao',
              see: 60.7,
              time: '17小时前'
            }
          },
          {
            id: 3,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png'),
              time: 520
            },
            body: {
              title: '自制大肠刺身伴侣，吃大肠刺身必备',
              type: {
                txt: '新上榜',
                hot: true
              },
              name: '手工梗',
              see: 60.7,
              time: '17小时前'
            }
          },
          {
            id: 4,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png'),
              time: 520
            },
            body: {
              title: '游戏史上最气人的游戏，键盘砸坏是个都无法通关！',
              type: {
                txt: '单机游戏。人气飙升',
                hot: true
              },
              name: '金闪闪',
              see: 60.7,
              time: '17小时前'
            }
          },
          {
            id: 5,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png'),
              time: 520
            },
            body: {
              title: '【巴啦啦小魔仙】‘游戏王子’揭秘迷之口音来历',
              type: {},
              name: '巴啦啦小魔仙',
              see: 60.7,
              time: '17小时前'
            }
          },
          {
            id: 6,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png'),
              time: 520
            },
            body: {
              title: '【短评】 王者荣耀kpl决赛舞台倒塌折射出国内电竞产业多种问题啊啊啊啊啊啊啊',
              type: {
                txt: '新上榜',
                hot: true
              },
              name: '芒果冰ol',
              see: 60.7,
              time: '17小时前'
            }
          },
          {
            id: 7,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png'),
              time: 110
            },
            body: {
              title: '大sao包了4斤粽子，咸肉蛋黄蜜枣，和儿子一起吃三口',
              type: {},
              name: '徐大sao',
              see: 60.7,
              time: '17小时前'
            }
          },
          {
            id: 8,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png'),
              time: 520
            },
            body: {
              title: '自制大肠刺身伴侣，吃大肠刺身必备',
              type: {
                txt: '新上榜',
                hot: true
              },
              name: '手工梗',
              see: 60.7,
              time: '17小时前'
            }
          },
          {
            id: 9,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png'),
              time: 520
            },
            body: {
              title: '游戏史上最气人的游戏，键盘砸坏是个都无法通关！',
              type: {
                txt: '单机游戏。人气飙升',
                hot: true
              },
              name: '金闪闪',
              see: 60.7,
              time: '17小时前'
            }
          },
          {
            id: 10,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png'),
              time: 520
            },
            body: {
              title: '【巴啦啦小魔仙】‘游戏王子’揭秘迷之口音来历',
              type: {},
              name: '巴啦啦小魔仙',
              see: 60.7,
              time: '17小时前'
            }
          }
        ],
        //追番数据
        chasingImg: [
        {
          img: require('../assets/image/chasing-1.jpg')
        },
        {
          img: require('../assets/image/chasing-2.jpg')
        },
        {
          img: require('../assets/image/chasing-3.jpg')
        },
        {
          img: require('../assets/image/chasing-4.jpg')
        }
      ],
        chasingHeadList: [
          {
            img: require('../assets/image/80x80.png'),
            txt: '番剧'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '国创'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '时间表'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '索引'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '点评'
          }
        ],
        ChasingLabelListBody: [
          {
            type: '番剧推荐',
            list: [
              {
                id: 1,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '宠物医院'
                },
                other: {
                  description: {
                    type: '一次相遇一生羁绊'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '宠物医院'
                },
                other: {
                  description: {
                    type: '张伟为谈中国崛起'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '本草中华'
                },
                other: {
                  description: {
                    type: '疗愈生命的智慧'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: true
                },
                body: {
                  title: '一百年长吗'
                },
                other: {
                  description: {
                    type: '五味杂陈手艺人生'
                  }
                }
              },
              {
                id: 5,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '猫咪国度'
                },
                other: {
                  description: {
                    type: '猫咪会统治世界吧'
                  }
                }
              },
              {
                id: 6,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '从秦皇岛汉武'
                },
                other: {
                  description: {
                    type: '大型史诗纪录片'
                  }
                }
              }
            ]
          },
          {
            type: '国创推荐',
            list: [
              {
                id: 1,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '宠物医院'
                },
                other: {
                  description: {
                    type: '一次相遇一生羁绊'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '宠物医院'
                },
                other: {
                  description: {
                    type: '张伟为谈中国崛起'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '本草中华'
                },
                other: {
                  description: {
                    type: '疗愈生命的智慧'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: true
                },
                body: {
                  title: '一百年长吗'
                },
                other: {
                  description: {
                    type: '五味杂陈手艺人生'
                  }
                }
              },
              {
                id: 5,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '猫咪国度'
                },
                other: {
                  description: {
                    type: '猫咪会统治世界吧'
                  }
                }
              },
              {
                id: 6,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '从秦皇岛汉武'
                },
                other: {
                  description: {
                    type: '大型史诗纪录片'
                  }
                }
              }
            ]
          },
          {
            type: '兴趣推荐',
            list: [
              {
                id: 1,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '宠物医院'
                },
                other: {
                  description: {
                    type: '一次相遇一生羁绊'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '宠物医院'
                },
                other: {
                  description: {
                    type: '张伟为谈中国崛起'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '本草中华'
                },
                other: {
                  description: {
                    type: '疗愈生命的智慧'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: true
                },
                body: {
                  title: '一百年长吗'
                },
                other: {
                  description: {
                    type: '五味杂陈手艺人生'
                  }
                }
              },
              {
                id: 5,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '猫咪国度'
                },
                other: {
                  description: {
                    type: '猫咪会统治世界吧'
                  }
                }
              },
              {
                id: 6,
                theme: 1,
                type: 'LiveBroadcast',
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '从秦皇岛汉武'
                },
                other: {
                  description: {
                    type: '大型史诗纪录片'
                  }
                }
              }
            ]
          }
        ],
        //影视数据
        MovieLabelListBody: [
          {
            type: '纪录片热播',
            list: [
              {
                id: 1,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '宠物医院'
                },
                other: {
                  description: {
                    type: '一次相遇一生羁绊'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '这就是中国'
                },
                other: {
                  description: {
                    type: '张伟为谈中国崛起'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '本草中华'
                },
                other: {
                  description: {
                    type: '疗愈生命的智慧'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: true
                },
                body: {
                  title: '一百年长吗'
                },
                other: {
                  description: {
                    type: '五味杂陈手艺人生'
                  }
                }
              },
              {
                id: 5,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '猫咪国度'
                },
                other: {
                  description: {
                    type: '猫咪会统治世界吧'
                  }
                }
              },
              {
                id: 6,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '从秦皇岛汉武'
                },
                other: {
                  description: {
                    type: '大型史诗纪录片'
                  }
                }
              }
            ]
          },
          {
            type: '电影热播',
            list: [
              {
                id: 1,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '宠物医院'
                },
                other: {
                  description: {
                    type: '一次相遇一生羁绊'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '这就是中国'
                },
                other: {
                  description: {
                    type: '张伟为谈中国崛起'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '本草中华'
                },
                other: {
                  description: {
                    type: '疗愈生命的智慧'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: true
                },
                body: {
                  title: '一百年长吗'
                },
                other: {
                  description: {
                    type: '五味杂陈手艺人生'
                  }
                }
              },
              {
                id: 5,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '猫咪国度'
                },
                other: {
                  description: {
                    type: '猫咪会统治世界吧'
                  }
                }
              },
              {
                id: 6,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '从秦皇岛汉武'
                },
                other: {
                  description: {
                    type: '大型史诗纪录片'
                  }
                }
              }
            ]
          },
          {
            type: '电视剧热播',
            list: [
              {
                id: 1,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '宠物医院'
                },
                other: {
                  description: {
                    type: '一次相遇一生羁绊'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '这就是中国'
                },
                other: {
                  description: {
                    type: '张伟为谈中国崛起'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '本草中华'
                },
                other: {
                  description: {
                    type: '疗愈生命的智慧'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: true
                },
                body: {
                  title: '一百年长吗'
                },
                other: {
                  description: {
                    type: '五味杂陈手艺人生'
                  }
                }
              },
              {
                id: 5,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '猫咪国度'
                },
                other: {
                  description: {
                    type: '猫咪会统治世界吧'
                  }
                }
              },
              {
                id: 6,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '从秦皇岛汉武'
                },
                other: {
                  description: {
                    type: '大型史诗纪录片'
                  }
                }
              }
            ]
          },
          {
            type: '综艺热播',
            list: [
              {
                id: 1,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '宠物医院'
                },
                other: {
                  description: {
                    type: '一次相遇一生羁绊'
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '这就是中国'
                },
                other: {
                  description: {
                    type: '张伟为谈中国崛起'
                  }
                }
              },
              {
                id: 3,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '本草中华'
                },
                other: {
                  description: {
                    type: '疗愈生命的智慧'
                  }
                }
              },
              {
                id: 4,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: true
                },
                body: {
                  title: '一百年长吗'
                },
                other: {
                  description: {
                    type: '五味杂陈手艺人生'
                  }
                }
              },
              {
                id: 5,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '猫咪国度'
                },
                other: {
                  description: {
                    type: '猫咪会统治世界吧'
                  }
                }
              },
              {
                id: 6,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/300x450.png'),
                  love: true,
                  member: false
                },
                body: {
                  title: '从秦皇岛汉武'
                },
                other: {
                  description: {
                    type: '大型史诗纪录片'
                  }
                }
              }
            ]
          }
        ],
        movieImg: [
          {
            img: require('../assets/image/movie-1.jpg')
          },
          {
            img: require('../assets/image/movie-2.jpg')
          },
          {
            img: require('../assets/image/movie-4.jpg')
          },
          {
            img: require('../assets/image/movie-5.jpg')
          }
        ],
        headList: [
          {
            img: require('../assets/image/80x80.png'),
            txt: '纪录片'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '电影'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '电视剧'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '热门榜单'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '非正式会谈'
          }
        ],
        relatedSuggestionList: [
          {
            id: 1,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png')
            },
            body: {
              title: '【短评】 王者荣耀kpl决赛舞台倒塌折射出国内电竞产业多种问题啊啊啊啊啊啊啊',
              type: {},
              name: '嗯？没了？'
            }
          },
          {
            id: 2,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png')
            },
            body: {
              title: '大sao包了4斤粽子，咸肉蛋黄蜜枣，和儿子一起吃三口',
              type: {},
              name: '徐大sao'
            }
          },
          {
            id: 3,
            theme: 2,
            top: {
              poster: require('../assets/image/700x400.png')
            },
            body: {
              title: '自制大肠刺身伴侣，吃大肠刺身必备',
              type: {},
              name: '手工梗'
            }
          }
        ],
        comingSoonList: [
          {
            time: '今天18:00',
            img: require('../assets/image/300x450.png'),
            type: true,
            name: '极限S: 羽毛球篇',
            fans: 2117
          },
          {
            time: '06-12 00:00',
            img: require('../assets/image/300x450.png'),
            type: true,
            name: '最后的警察',
            fans: 4569
          },
          {
            time: '06-12 18:00',
            img: require('../assets/image/300x450.png'),
            type: true,
            name: '少林三十六房',
            fans: 3737
          },
          {
            time: '06-12 19:00',
            img: require('../assets/image/300x450.png'),
            type: true,
            name: '极限S: 羽毛球篇',
            fans: 2117
          },
          {
            time: '06-12 20:00',
            img: require('../assets/image/300x450.png'),
            type: true,
            name: '最后的警察',
            fans: 4569
          },
          {
            time: '06-12 21:00',
            img: require('../assets/image/300x450.png'),
            type: true,
            name: '少林三十六房',
            fans: 3737
          }
        ],
        exclusivePlanningList: [
          {
            img: require('../assets/image/200x100.png'),
            name: '周末放映室',
            time: 232
          },
          {
            img: require('../assets/image/200x100.png'),
            name: '俱乐部',
            time: 19
          },
          {
            img: require('../assets/image/200x100.png'),
            name: '邵氏出品',
            txt: '必属佳品'
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
    computed: {},
    methods: {
      onPlayerPlay(player, item) {
        console.log(item)
        this.$set(item, 'videoShow', true)
        console.log('player play!', player)
      },
      onPlayerPause(player) {
        console.log('player pause!', player)
      },
      //底部弹出框关闭
      cancel() {
        this.popupShow = false
      },
      //nav导航栏，点击
      itemClick(val) {
        // console.log(val)
      },
      //更新数据
      async getPostList(type) {
        let self = this
        // let num = Math.random() * 10
        let num = 8
        let _list = []
        let count = parseInt(num)
        switch (type) {
          case 'LiveBroadcast':
            while (count-- && count-- > 1) {
              _list.push(this.LiveBroadcast[count])
            }
            console.log(_list, num)
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num > 5) {
                //labelListBody更新数据
                console.log('gogoogo')
                self.scrollLiveBroadcast < 0 ? self.scrollLiveBroadcast = 1 : self.scrollLiveBroadcast++
              } else if (this.typeScroll === 'UP' && num <= 5) {
                self.scrollLiveBroadcast === 0 ? self.scrollLiveBroadcast-- : self.scrollLiveBroadcast = 0
              } else if (this.typeScroll === 'DN' && num > 5) {
                self.scrollLiveBroadcast <= 0 ? self.scrollLiveBroadcast-- : self.scrollLiveBroadcast++
                console.log('gogoogo')
                self.$set(this.pullDownRefresh, 'success', ' 已为您更新数据！！！')
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scrollLiveBroadcast <= 0 ? self.scrollLiveBroadcast-- : self.scrollLiveBroadcast++
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
          case 'popular':
            while (count--) {
              _list.push(this.popularList[count])
            }
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num > 5) {
                self.popularList = [...self.popularList, ..._list]
                self.scrollPopular < 0 ? self.scrollPopular = 1 : self.scrollPopular++
              } else if (this.typeScroll === 'UP' && num <= 5) {
                self.scrollPopular === 0 ? self.scrollPopular-- : self.scrollPopular = 0
              } else if (this.typeScroll === 'DN' && num > 5) {
                self.scrollPopular <= 0 ? self.scrollPopular-- : self.scrollPopular++
                self.popularList = [..._list, ...self.popularList]
                self.$set(this.pullDownRefresh, 'success', `已为您更新${_list.length}条数据！！！`)
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scroll <= 0 ? self.scroll-- : self.scroll++
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
          case 'popular':
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
          case 'popular':
            this.getPostList(type)
            break
          case 'record':
            this.getPostList(type)
            break
          case 'LiveBroadcast':
            this.getPostList(type)
            break
        }
      }
    },
    created() {
      this.$nextTick(() => {
      })
    },
    filters: {
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
              .recommended-live-broadcast_head
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
              .recommended-live-broadcast_body
                display: flex
                flex-wrap: wrap
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
                  .time, .name
                    color: rgba(0, 0, 0, .6)
                    margin-left: 0.08rem
                .right
                  display: flex
                  align-items: center
                  color: rgba(0, 0, 0, .6)
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
                  color: rgba(0, 0, 0, .6)
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
                  color: rgba(0, 0, 0, .6)
                  display: flex
                  align-items: center
                  i
                    font-size: 0.4rem
              .label-list_body
                padding: 0 0.2rem
                display: flex
                flex-wrap: wrap
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
      .popular
        background-color: #fff
        .popular-head
          background-color: #fff
          height: 0.8rem
          display: flex
          position: relative
          &:after
            height: 1px
            position: absolute
            bottom: 0
            left: 0
            content: ''
            width: 100%
            background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
          .popular-head_item
            flex: 1
            display: flex
            align-items: center
            justify-content: center
            height: 100%
            position: relative
            &:first-child
              &:after
                position: absolute
                content: ''
                right: 0
                top: 50%
                width: 1px
                height: 40%
                background-color: #e5e5e5
                transform translateY(-50%)
      .movie
        background-color: #fff
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
              color: rgba(0, 0, 0, .6)
              display: flex
              align-items: center
              i
                font-size: 0.4rem
          .label-list_body
            padding: 0 0.2rem
            display: flex
            flex-wrap: wrap
            .app-list-theme1
              flex: 0 0 32%
              border-radius: 10px
              margin-right: 2%
              &:nth-child(3n+3)
                margin-right: 0%
              .desc
                top: 0
                bottom: auto
                padding: 0
                i
                  background-color: rgba(0, 0, 0, .2)
                  border-bottom-right-radius: 10px
                .member
                  padding: 0.04rem
                  display: inline-block
                  transform: scale(0.8)
                  background-color: #f45a8d
                  color: #fff
        .head-list
          padding: 0.1rem 0.2rem 0.2rem
          display: flex
          position: relative
          &:after
            height: 1px
            position: absolute
            bottom: 0
            left: 0
            content: ''
            width: 100%
            background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
          .head-list_item
            flex: 1
            display: flex
            flex-direction: column
            align-items: center
            img
              width: 60%
            .txt
              margin-top: 0.1rem
        .relatedSuggestion
          .relatedSuggestion_head
            text-align: left
            height: 0.9rem
            line-height: 0.9rem
            padding: 0 0.2rem
            font-weight: 600
          .left
            position: relative
            img
              width: 100%
              border-radius: 10px
            .desc
              position: absolute
              right: 0.08rem
              bottom: 0.08rem
              background-color: rgba(0, 0, 0, .2)
              .time
                padding: 0.04rem
                border-radius: 2px
                color: rgba(255, 255, 255, .7)
          .right
            margin-left: 0.2rem
            text-align: left
            height: 100%
            display: flex
            flex-direction: column
            justify-content: space-between
            .title
              line-height: 1.3
              overflow: hidden
              display: -webkit-box
              -webkit-line-clamp: 2
              -webkit-box-orient: vertical
              word-break: break-all
              text-overflow: ellipsis
            .type
              min-height: 0.32rem
              .txt
                display: inline-block
                &.is-hot
                  background-color: #f90
                  padding: 0.04rem
                  border-radius: 4px
                  color: #fff
                  font-size: 0.24rem
            .name
              color: rgba(0, 0, 0, .6)
              margin-top: 0.1rem
            .seeAndTimeWrapper
              height: 0.4rem
              display: flex
              justify-content: space-between
              align-items: center
              color: rgba(0, 0, 0, .6)
              .see
                margin-right: 0.1rem
        .comingSoon
          .comingSoon_head
            text-align: left
            height: 0.9rem
            line-height: 0.9rem
            padding: 0 0.2rem
            font-weight: 600
          .comingSoon_content
            position: relative
            height: 3.62rem
            .scroll-box
              position: absolute
              left: 0
              width: 100%
              z-index 9999
              .scroll-item
                &:first-child
                  .item_head
                    .special
                      background-color: #fff !important
                .comingSoon_content-item
                  display: flex
                  flex-direction: column
                  align-items: center
                  width 1.7rem
                  .item_head
                    width: 100%
                    display: flex
                    align-items: center
                    padding: 0.08rem 0
                    .line
                      flex: 1
                      height: 2px
                      background-color aqua
                    .time
                      padding: 0.04rem 0.08rem
                      background-color: aqua
                      border-radius: 10px
                  .item_body
                    width: 100%
                    padding: 0 0.1rem
                    position: relative
                    img
                      width: 100%
                    .type
                      position: absolute
                      right: 0.1rem
                      top: 0.06rem
                      font-size: 0.24rem
                      transform: scale(.8)
                      padding: 0.04rem 0.04rem
                      background-color: #f45a8d
                      color: #fff
                      border-radius: 2px
                    .fans
                      position: absolute
                      left: 0.1rem
                      bottom: 0.1rem
                      font-size: 0.24rem
                      transform: scale(.8)
                      color: #fff
                  .item_footer
                    width: 100%
                    .name
                      display: block
                      width: 100%
                      padding: 0.1rem 0
                      overflow: hidden
                      text-overflow: ellipsis
                      white-space: nowrap
                    /deep/ .yd-btn
                      height: 0.4rem
                      line-height: 0.4rem
                      padding: 0 0.12rem
                      border: 1px solid #f45a8d
                      span
                        display: flex
                        align-items: center
                        i
                          margin-right: 0.08rem
        .exclusivePlanning
          .exclusivePlanning_head
            padding: 0 0.2rem
            height: 0.9rem
            display: flex
            justify-content: space-between
            align-items: center
            .exclusivePlanning_left
              font-weight: 600
            .exclusivePlanning_right
              display: flex
              align-items: center
              color: rgba(0, 0, 0, .6)
          .exclusivePlanning_content
            .exclusivePlanning_content-item
              text-align: left
              padding: 0.2rem
              position: relative
              &:after
                height: 1px
                position: absolute
                bottom: 0
                left: 0
                content: ''
                width: 100%
                background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
              img
                width: 100%
              .name
                display: inline-block
                margin-top: 0.1rem
              .time,.txt
                margin-left: 0.1rem
      .chasing
        background-color: #fff
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
              color: rgba(0, 0, 0, .6)
              display: flex
              align-items: center
              i
                font-size: 0.4rem
          .label-list_body
            padding: 0 0.2rem
            display: flex
            flex-wrap: wrap
            .app-list-theme1
              flex: 0 0 32%
              border-radius: 10px
              margin-right: 2%
              &:nth-child(3n+3)
                margin-right: 0%
              .desc
                top: 0
                bottom: auto
                padding: 0
                i
                  background-color: rgba(0, 0, 0, .2)
                  border-bottom-right-radius: 10px
                .member
                  padding: 0.04rem
                  display: inline-block
                  transform: scale(0.8)
                  background-color: #f45a8d
                  color: #fff
        .head-list
          padding: 0.1rem 0.2rem 0.2rem
          display: flex
          position: relative
          &:after
            height: 1px
            position: absolute
            bottom: 0
            left: 0
            content: ''
            width: 100%
            background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
          .head-list_item
            flex: 1
            display: flex
            flex-direction: column
            align-items: center
            img
              width: 60%
            .txt
              margin-top: 0.1rem
        .relatedSuggestion
          .relatedSuggestion_head
            text-align: left
            height: 0.9rem
            line-height: 0.9rem
            padding: 0 0.2rem
            font-weight: 600
          .left
            position: relative
            img
              width: 100%
              border-radius: 10px
            .desc
              position: absolute
              right: 0.08rem
              bottom: 0.08rem
              background-color: rgba(0, 0, 0, .2)
              .time
                padding: 0.04rem
                border-radius: 2px
                color: rgba(255, 255, 255, .7)
          .right
            margin-left: 0.2rem
            text-align: left
            height: 100%
            display: flex
            flex-direction: column
            justify-content: space-between
            .title
              line-height: 1.3
              overflow: hidden
              display: -webkit-box
              -webkit-line-clamp: 2
              -webkit-box-orient: vertical
              word-break: break-all
              text-overflow: ellipsis
            .type
              min-height: 0.32rem
              .txt
                display: inline-block
                &.is-hot
                  background-color: #f90
                  padding: 0.04rem
                  border-radius: 4px
                  color: #fff
                  font-size: 0.24rem
            .name
              color: rgba(0, 0, 0, .6)
              margin-top: 0.1rem
            .seeAndTimeWrapper
              height: 0.4rem
              display: flex
              justify-content: space-between
              align-items: center
              color: rgba(0, 0, 0, .6)
              .see
                margin-right: 0.1rem
        .comingSoon
          .comingSoon_head
            text-align: left
            height: 0.9rem
            line-height: 0.9rem
            padding: 0 0.2rem
            font-weight: 600
          .comingSoon_content
            position: relative
            height: 3.62rem
            .scroll-box
              position: absolute
              left: 0
              width: 100%
              z-index 9999
              .scroll-item
                &:first-child
                  .item_head
                    .special
                      background-color: #fff !important
                .comingSoon_content-item
                  display: flex
                  flex-direction: column
                  align-items: center
                  width 1.7rem
                  .item_head
                    width: 100%
                    display: flex
                    align-items: center
                    padding: 0.08rem 0
                    .line
                      flex: 1
                      height: 2px
                      background-color aqua
                    .time
                      padding: 0.04rem 0.08rem
                      background-color: aqua
                      border-radius: 10px
                  .item_body
                    width: 100%
                    padding: 0 0.1rem
                    position: relative
                    img
                      width: 100%
                    .type
                      position: absolute
                      right: 0.1rem
                      top: 0.06rem
                      font-size: 0.24rem
                      transform: scale(.8)
                      padding: 0.04rem 0.04rem
                      background-color: #f45a8d
                      color: #fff
                      border-radius: 2px
                    .fans
                      position: absolute
                      left: 0.1rem
                      bottom: 0.1rem
                      font-size: 0.24rem
                      transform: scale(.8)
                      color: #fff
                  .item_footer
                    width: 100%
                    .name
                      display: block
                      width: 100%
                      padding: 0.1rem 0
                      overflow: hidden
                      text-overflow: ellipsis
                      white-space: nowrap
                    /deep/ .yd-btn
                      height: 0.4rem
                      line-height: 0.4rem
                      padding: 0 0.12rem
                      border: 1px solid #f45a8d
                      span
                        display: flex
                        align-items: center
                        i
                          margin-right: 0.08rem
        .exclusivePlanning
          .exclusivePlanning_head
            padding: 0 0.2rem
            height: 0.9rem
            display: flex
            justify-content: space-between
            align-items: center
            .exclusivePlanning_left
              font-weight: 600
            .exclusivePlanning_right
              display: flex
              align-items: center
              color: rgba(0, 0, 0, .6)
          .exclusivePlanning_content
            .exclusivePlanning_content-item
              text-align: left
              padding: 0.2rem
              position: relative
              &:after
                height: 1px
                position: absolute
                bottom: 0
                left: 0
                content: ''
                width: 100%
                background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
              img
                width: 100%
              .name
                display: inline-block
                margin-top: 0.1rem
              .time,.txt
                margin-left: 0.1rem
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
    .me-broadcast-live
      position: absolute
      right: 0.2rem
      bottom: 0.8rem
      z-index: 9999
      width: 1rem
      height: 1rem
      border-radius: 50%
      background-color: #f45a8d
      display: flex
      justify-content: center
      align-items: center
      a
        font-size: 0.3rem
        font-weight: 600
        color: #f5ebeb
</style>
