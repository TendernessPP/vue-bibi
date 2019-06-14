<template>
  <div id="channel-index">
    <!--滚动nav栏-->
    <app-scroll-tab :navList="navList" v-model="active" :item-click="itemClick" font-size="0.28rem"
                    bgColor="#f45a8d" fontColor="rgba(255,255,255,0.7)"
                    activeColor="#fff" height='0.7rem' margin="0.4rem" ref="scrollTab" :special="true"></app-scroll-tab>
    <div class="icon">
      <yd-icon name="type" size=".4rem" color="#fff"></yd-icon>
    </div>
    <div class="body">
      <!--左右滑动，并且与头部nav联动-->
      <app-slide ref="slide" :autoPlay="isAutoPlay" :loop="isLoop" :showDot="isShowDot" :interval="interval"
                 :threshold="threshold" :speed="speed"
                 v-model="active">
        <div v-for="(item,index) in navList" :key="index">
          <!--广场部分-->
          <div v-if="item.text === '广场'" class="square">
            <app-scroll :pullUpLoad="false" :pullDownRefresh="pullDownRefresh" v-model="scrollSquare"
                        @pullingUp="scrollUP('Square')"
                        @pullingDown="scrollDN('Square')">
              <div class="list-item_wrapper">
                <div class="label-list-wrapper" v-for="(item,index) in labelListBody" :key="index">
                  <div class="label-list_top">
                    <span class="left">{{item.type}}</span>
                    <span class="right"><i class="icon-jiahao"></i>订阅</span>
                  </div>
                  <div class="label-list_body">
                    <app-list v-for="(list,index) in item.list" :key="index" :theme="list.theme"
                              :class="list.special?'is-special':''">
                      <div slot="top" v-if="list.top" class="app-list-item_top">
                        <img :src="list.top.poster" alt="">
                        <div class="desc">
                          <span class="play"><i class="icon-bofang"></i>{{list.top.play}}</span>
                          <span class="comment"><i class="icon-list-1-copy"></i>{{list.top.comment}}</span>
                          <span class="time">{{list.top.time | formatTime}}</span>
                        </div>
                      </div>
                      <div slot="body" v-if="list.body.title" class="app-list-item_body">{{list.body.title}}</div>
                    </app-list>
                  </div>
                </div>
                <div class="find-more">发现更多频道<i class="icon-youjiantou" style="font-size: 0.4rem"></i></div>
              </div>
              <div class="channel-record">
                <div class="channel-record_item" v-for="(item,index) in channelRecord" :key="index">
                  <img :src="item.img" alt="" class="channel-record_item-img">
                  <span class="channel-record_item-txt">{{item.txt}}</span>
                </div>
              </div>
            </app-scroll>
          </div>
          <!--科普部分-->
          <div v-if="item.text === '科普'" class="popular-science">
            <div class="popular-science_head">
              <span class="popular-science_head-txt" :class="popularScienceActive===0?'is-active':''"
                    @click="popularScienceChange(0)">推荐</span>
              <span class="popular-science_head-txt" :class="popularScienceActive===1?'is-active':''"
                    @click="popularScienceChange(1)">话题</span>
            </div>
            <!--<img src="https://via.placeholder.com/300x100?text=video" alt="">-->
            <app-scroll :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh"
                        v-model="scrollPopularScienceRecommend"
                        @pullingUp="scrollUP('PopularScienceRecommend')"
                        @pullingDown="scrollDN('PopularScienceRecommend')" v-if="popularScienceActive===0">
              <div class="list-item_wrapper">
                <app-list v-for="(item,index) in popularScienceRecommend" :key="index" :theme="item.theme"
                          :class="item.special?'is-special':''">
                  <div slot="top" v-if="item.top" class="app-list-item_top">
                    <img :src="item.top.poster" alt="">
                    <div class="desc">
                      <span class="time">{{item.top.time | formatTime}}</span>
                      <span class="play">{{item.top.play}}观看</span>
                      <span class="comment">{{item.top.comment}}弹幕</span>
                    </div>
                  </div>
                  <div slot="other" class="app-list-item_other">
                    <div class="other_left">
                      <img :src="item.other.avata" alt="">
                      <div class="title-user">
                        <span class="title">{{item.other.title}}</span>
                        <span class="user">{{item.other.user}}~{{item.other.time}}</span>
                      </div>
                    </div>
                    <div class="other_right"><i class="icon-gengduo"></i></div>
                  </div>
                </app-list>
              </div>
            </app-scroll>
            <app-scroll :pullUpLoad="pullUpLoad" :pullDownRefresh="pullDownRefresh" v-model="scrollPopularScienceTopic"
                        @pullingUp="scrollUP('PopularScienceTopic')"
                        @pullingDown="scrollDN('PopularScienceTopic')" v-if="popularScienceActive===1">
              <div class="popular-science-topic_head">
                <div class="popular-science-topic_head-msg">
                  浏览<span class="txt">1.4亿</span>讨论<span class="txt">83.6万</span>
                </div>
                <div class="popular-science-topic_head-people">
                  <div class="img">
                    <img v-for="(item,index) in topicPeople" :key="index" :src="item.avata">
                  </div>
                  <div class="options">
                    更多活跃用户<i class="icon-youjiantou" style="font-size: 0.4rem"></i>
                  </div>
                </div>
              </div>
              <div style="height: 0.2rem;background-color: rgba(0,0,0,.1)"></div>
              <div class="hot">热门</div>
              <div class="list-item_wrapper">
                <app-list v-for="(item,index) in popularScienceTopic" :key="index" :theme="item.theme">
                  <div slot="top" class="app-list-item_top">
                    <div class="top_head">
                      <div class="top_head-left">
                        <img :src="item.top.avata" alt="">
                        <div class="name-time">
                          <span class="name">{{item.top.name}}</span>
                          <span class="time">{{item.top.time}}~投稿了视频</span>
                        </div>
                      </div>
                      <div class="top_head-right">
                        <span class="attention"><i class="icon-jiahao" style="font-size:0.3rem;margin-right: 0.06rem"></i>关注</span>
                        <i class="icon-gengduo" style="font-size: 0.4rem"></i>
                      </div>
                    </div>
                    <div class="top_title">
                      <span class="type">{{item.top.type}}</span>
                      <span class="txt">{{item.top.txt}}</span>
                    </div>
                  </div>
                  <div slot="body" class="app-list-item_body">
                    <img :src="item.body.img" alt="">
                    <div class="desc">
                      <span class="time">{{item.body.time | formatTime}}</span>
                      <span class="play">{{item.body.play}}观看</span>
                      <span class="comment">{{item.body.comment}}弹幕</span>
                    </div>
                  </div>
                  <div slot="other" class="app-list-item_other">
                    <div class="description">{{item.body.description}}</div>
                    <div class="options">
                      <span class="forward"><i class="icon-zhuanfa"></i>{{item.other.forward}}</span>
                      <span class="comment"><i class="icon-pinglun"></i>{{item.other.comment}}</span>
                      <span class="like"><i class="icon-like"></i>{{item.other.like}}</span>
                    </div>
                  </div>
                </app-list>
              </div>
            </app-scroll>
          </div>
          <!--技术宅部分-->
          <div v-if="item.text === '技术宅'">
            22
          </div>
        </div>
      </app-slide>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      'app-scroll-tab': require('../../src/components/scrollTab/scroll-tab.vue').default,
      'app-scroll': require('../components/scroll/scroll.vue').default,
      'app-slide': require('../components/slider/slide.vue').default,
      'app-list': require('../components/list/list.vue').default
    },
    data() {
      return {
        //app-slider
        turnToPrev: false,
        turnToNext: false,
        isAutoPlay: false,
        isLoop: false,
        isShowDot: false,
        speed: 400,
        threshold: 0.3,
        interval: 4000,
        active: 0,
        navList: [
          {
            text: '广场'
          },
          {
            text: '科普'
          },
          {
            text: '技术宅'
          },
          {
            text: '影评'
          },
          {
            text: '虚拟UP主'
          }
        ],
        scrollSquare: 0,
        scrollPopularScienceRecommend: 0,
        scrollPopularScienceTopic: 0,
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
        typeScroll: 'UP',
        labelListBody: [
          {
            type: 'e3 2019',
            list: [
              {
                id: 1,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  play: 4.1,
                  comment: 132,
                  time: '150'
                },
                body: {
                  title: '唐老鸭冒险记'
                },
                other: {
                  description: {
                    type: ''
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  play: 4.1,
                  comment: 132,
                  time: '150'
                },
                body: {
                  title: '鸭梨：三号皇后 龙法多多少少'
                },
                other: {
                  description: {
                    type: ''
                  }
                }
              }
            ]
          },
          {
            type: '超级英雄',
            list: [
              {
                id: 1,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  play: 4.1,
                  comment: 132,
                  time: '150'
                },
                body: {
                  title: '唐老鸭冒险记'
                },
                other: {
                  description: {
                    type: ''
                  }
                }
              },
              {
                id: 2,
                theme: 1,
                special: true,
                top: {
                  poster: require('../assets/image/700x400.png'),
                  play: 4.1,
                  comment: 132,
                  time: '150'
                },
                body: {
                  title: '鸭梨：三号皇后 龙法多多少少'
                },
                other: {
                  description: {
                    type: ''
                  }
                }
              }
            ]
          }
        ],
        channelRecord: [
          {
            img: require('../assets/image/80x80.png'),
            txt: '漫画'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '专栏'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '直播'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '音频'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '动画'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '音乐'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '舞蹈'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '游戏'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '科技 '
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '数码'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '漫画'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '专栏'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '直播'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '音频'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '动画'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '音乐'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '舞蹈'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '游戏'
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '科技 '
          },
          {
            img: require('../assets/image/80x80.png'),
            txt: '数码'
          }
        ],
        //科普数据
        popularScienceRecommend: [
          {
            id: 1,
            theme: 1,
            special: true,
            top: {
              poster: require('../assets/image/200x100.png'),
              play: 2349,
              comment: 132,
              time: '150'
            },
            other: {
              avata: require('../assets/image/80x80.png'),
              title: '宅男心中的日本女神为何羡慕中国人可以大口吃西瓜？给你30元让我吃一口',
              user: 'did4520',
              time: '06-19'
            }
          },
          {
            id: 2,
            theme: 1,
            special: true,
            top: {
              poster: require('../assets/image/200x100.png'),
              play: 2.1,
              comment: 140,
              time: '221'
            },
            other: {
              avata: require('../assets/image/80x80.png'),
              title: '有什么阵容可以和这张图片相提并论',
              user: '小k趣事',
              time: '06-19'
            }
          },
          {
            id: 3,
            theme: 1,
            special: true,
            top: {
              poster: require('../assets/image/200x100.png'),
              play: 2349,
              comment: 132,
              time: '150'
            },
            other: {
              avata: require('../assets/image/80x80.png'),
              title: '中国十大灵异传说，神秘失踪的科学家和灵异双鱼玉佩事件',
              user: 'did4520',
              time: '06-19'
            }
          },
          {
            id: 4,
            theme: 1,
            special: true,
            top: {
              poster: require('../assets/image/200x100.png'),
              play: 2349,
              comment: 132,
              time: '150'
            },
            other: {
              avata: require('../assets/image/80x80.png'),
              title: '宅男心中的日本女神为何羡慕中国人可以大口吃西瓜？给你30元让我吃一口',
              user: 'did4520',
              time: '06-19'
            }
          },
          {
            id: 5,
            theme: 1,
            special: true,
            top: {
              poster: require('../assets/image/200x100.png'),
              play: 2349,
              comment: 132,
              time: '150'
            },
            other: {
              avata: require('../assets/image/80x80.png'),
              title: '宅男心中的日本女神为何羡慕中国人可以大口吃西瓜？给你30元让我吃一口',
              user: 'did4520',
              time: '06-19'
            }
          }
        ],
        popularScienceTopic: [
          {
            id: 1,
            theme: 3,
            top: {
              avata: require('../assets/image/80x80.png'),
              name: '纳豆奶奶',
              time: '6-12',
              type: '#亲子###科普##日本#',
              txt: '日本妈妈是咋个带娃的？日本带娃好物宝箱~~'
            },
            body: {
              img: require('../assets/image/700x400.png'),
              description: '日本妈妈是怎么带娃的？知道真相后我惊呆了。。。',
              time: 150,
              play: 1.8,
              comment: 211
            },
            other: {
              forward: 17,
              comment: 1477,
              like: 1.9
            }
          },
          {
            id: 2,
            theme: 3,
            top: {
              avata: require('../assets/image/80x80.png'),
              name: '纳豆奶奶',
              time: '6-12',
              type: '#亲子###科普##日本#',
              txt: '日本妈妈是咋个带娃的？日本带娃好物宝箱~~'
            },
            body: {
              img: require('../assets/image/700x400.png'),
              description: '日本妈妈是怎么带娃的？知道真相后我惊呆了。。。',
              time: 150,
              play: 1.8,
              comment: 211
            },
            other: {
              forward: 17,
              comment: 1477,
              like: 1.9
            }
          },
          {
            id: 3,
            theme: 3,
            top: {
              avata: require('../assets/image/80x80.png'),
              name: '纳豆奶奶',
              time: '6-12',
              type: '#亲子###科普##日本#',
              txt: '日本妈妈是咋个带娃的？日本带娃好物宝箱~~'
            },
            body: {
              img: require('../assets/image/700x400.png'),
              description: '日本妈妈是怎么带娃的？知道真相后我惊呆了。。。',
              time: 150,
              play: 1.8,
              comment: 211
            },
            other: {
              forward: 17,
              comment: 1477,
              like: 1.9
            }
          },
          {
            id: 4,
            theme: 3,
            top: {
              avata: require('../assets/image/80x80.png'),
              name: '纳豆奶奶',
              time: '6-12',
              type: '#亲子###科普##日本#',
              txt: '日本妈妈是咋个带娃的？日本带娃好物宝箱~~'
            },
            body: {
              img: require('../assets/image/700x400.png'),
              description: '日本妈妈是怎么带娃的？知道真相后我惊呆了。。。',
              time: 150,
              play: 1.8,
              comment: 211
            },
            other: {
              forward: 17,
              comment: 1477,
              like: 1.9
            }
          },
          {
            id: 5,
            theme: 3,
            top: {
              avata: require('../assets/image/80x80.png'),
              name: '纳豆奶奶',
              time: '6-12',
              type: '#亲子###科普##日本#',
              txt: '日本妈妈是咋个带娃的？日本带娃好物宝箱~~'
            },
            body: {
              img: require('../assets/image/700x400.png'),
              description: '日本妈妈是怎么带娃的？知道真相后我惊呆了。。。',
              time: 150,
              play: 1.8,
              comment: 211
            },
            other: {
              forward: 17,
              comment: 1477,
              like: 1.9
            }
          }
        ],
        popularScienceActive: 0,
        topicPeople: [
          {
            avata: require('../assets/image/80x80.png')
          },
          {
            avata: require('../assets/image/80x80.png')
          },
          {
            avata: require('../assets/image/80x80.png')
          },
          {
            avata: require('../assets/image/80x80.png')
          },
          {
            avata: require('../assets/image/80x80.png')
          }
        ]
      }
    },
    computed: {},
    methods: {
      //nav导航栏，点击
      itemClick(val) {
        // console.log(val)
      },
      //更新数据
      //更新数据
      async getPostList(type) {
        let self = this
        // let num = Math.random() * 10
        let num = 5
        let _list = []
        let count = parseInt(num)
        switch (type) {
          case 'Square':
            //请求数据更新
            break
          case 'PopularScienceRecommend':
            while (count--) {
              _list.push(this.popularScienceRecommend[count])
            }
            console.log(_list)
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num >= 5) {
                console.log(_list)
                self.popularScienceRecommend = [...self.popularScienceRecommend, ..._list]
                self.scrollPopularScienceRecommend < 0 ? self.scrollPopularScienceRecommend = 1 : self.scrollPopularScienceRecommend++
              } else if (this.typeScroll === 'UP' && num < 5) {
                self.scrollPopularScienceRecommend === 0 ? self.scrollPopularScienceRecommend-- : self.scrollPopularScienceRecommend = 0
              } else if (this.typeScroll === 'DN' && num >= 5) {
                self.scrollPopularScienceRecommend <= 0 ? self.scrollPopularScienceRecommend-- : self.scrollPopularScienceRecommend++
                self.popularScienceRecommend = [..._list, ...self.popularScienceRecommend]
                self.$set(this.pullDownRefresh, 'success', `已为您更新${_list.length}条数据！！！`)
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scrollPopularScienceRecommend <= 0 ? self.scrollPopularScienceRecommend-- : self.scrollPopularScienceRecommend++
                self.$set(this.pullDownRefresh, 'success', '已是最新数据！！！')
              }
            }, 1500)
            break
          case 'PopularScienceTopic':
            while (count--) {
              _list.push(this.popularScienceTopic[count])
            }
            console.log(_list)
            setTimeout(() => {
              if (this.typeScroll === 'UP' && num >= 5) {
                console.log(_list)
                self.popularScienceTopic = [...self.popularScienceTopic, ..._list]
                self.scrollPopularScienceTopic < 0 ? self.scrollPopularScienceTopic = 1 : self.scrollPopularScienceTopic++
              } else if (this.typeScroll === 'UP' && num < 5) {
                self.scrollPopularScienceTopic === 0 ? self.scrollPopularScienceTopic-- : self.scrollPopularScienceTopic = 0
              } else if (this.typeScroll === 'DN' && num >= 5) {
                self.scrollPopularScienceTopic <= 0 ? self.scrollPopularScienceTopic-- : self.scrollPopularScienceTopic++
                self.popularScienceTopic = [..._list, ...self.popularScienceTopic]
                self.$set(this.pullDownRefresh, 'success', `已为您更新${_list.length}条数据！！！`)
              } else if (this.typeScroll === 'DN' && num <= 5) {
                self.scrollPopularScienceTopic <= 0 ? self.scrollPopularScienceTopic-- : self.scrollPopularScienceTopic++
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
          case 'Square':
            // this.getPostList(type)
            break
          case 'PopularScienceRecommend':
            this.getPostList(type)
            break
          case 'PopularScienceTopic':
            this.getPostList(type)
            break
        }
      },
      //下拉刷新
      scrollDN(type) {
        this.typeScroll = 'DN'
        switch (type) {
          case 'Square':
            this.getPostList(type)
            break
          case 'PopularScienceRecommend':
            this.getPostList(type)
            break
          case 'PopularScienceTopic':
            this.getPostList(type)
            break
        }
      },
      //推荐话题切换
      popularScienceChange(val) {
        this.popularScienceActive = val
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
  #channel-index
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif
    width: 100%
    position: absolute
    top: 0
    bottom: 0.91rem
    /deep/ .scroll-box
      .list-item
        &.is-active
          .list-item_val
            &:after
              background-color: #fff
    .icon
      position: absolute
      right: 0
      top: 0.06rem
      padding: 0.1rem
      z-index: 2
      background-color: #f45a8d
    .body
      height: calc(100% - 0.7rem)
      overflow: hidden
      .square
        .list-item_wrapper
          padding-bottom: 0.4rem
          position: relative
          &:after
            height: 1px
            position: absolute
            bottom: 0
            left: 0
            content: ''
            width: 100%
            background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
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
                color: #f45a8d
                display: flex
                align-items: center
                padding: 0rem 0.1rem
                border: 1px solid #f45a8d
                border-radius: 4px
                i
                  font-size: 0.4rem
            .label-list_body
              padding: 0 0.2rem
              display: flex
              flex-wrap: wrap
              .app-list-theme1
                flex: 0 0 49%
                border-radius: 10px
                .app-list-title
                  span
                    -webkit-line-clamp: 2 !important
                &:nth-child(odd)
                  margin-right: 2%
          .find-more
            color: #f45a8d
            display: flex
            justify-content: center
            align-items: center
        .channel-record
          padding: 0.3rem 0.2rem
          display: flex
          flex-wrap: wrap
          .channel-record_item
            flex: 0 0 25%
            display: flex
            flex-direction: column
            align-items: center
            margin-bottom: 0.2rem
            .channel-record_item-img
              width: 50%
            .channel-record_item-txt
              margin-top: 0.2rem
      .popular-science
        .popular-science_head
          height: 0.6rem
          display: flex
          .popular-science_head-txt
            flex: 1
            display: flex
            justify-content: center
            align-items: center
            &.is-active
              color: #f45a8d
        .list-wrapper
          height: calc(100% - 0.6rem)
          .popular-science-topic_head
            .popular-science-topic_head-msg
              color: rgba(0, 0, 0, .6)
              height: 0.6rem
              display: flex
              align-items: center
              padding: 0 0.2rem
              position: relative
              &:after
                height: 1px
                position: absolute
                bottom: 0
                left: 0
                content: ''
                width: 100%
                background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
              .txt
                color: #000
                margin-left: 0.1rem
                margin-right: 0.4rem
            .popular-science-topic_head-people
              display: flex
              justify-content: space-between
              align-items: center
              height: 0.6rem
              padding: 0 0.2rem
              .img
                >img
                  width: 0.4rem
                  height: 0.4rem
                  border-radius: 50%
              .options
                display: flex
                align-items: center
                transform: scale(.8)
          .hot
            padding: 0 0.2rem
            height: 0.5rem
            display: flex
            align-items: center
            position: relative
            &:after
              height: 1px
              position: absolute
              bottom: 0
              left: 0
              content: ''
              width: 100%
              background-image: linear-gradient(0deg, #e5e5e5 50%, transparent 50%);
          .list-item_wrapper
            padding: 0 0.2rem
            .app-list-item_top
              .desc
                display: flex
                justify-content: flex-start
                .play, .comment
                  margin-left: 0.2rem
      .slide
        height: 100%
        /deep/ .slide-group
          height: 100%
          .slide-item
            height: 100%
            > div
              height: 100%
</style>
