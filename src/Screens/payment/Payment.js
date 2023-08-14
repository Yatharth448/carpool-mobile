import React, { Component } from 'react'
import { View, Text, Image, Dimensions, FlatList, ImageBackground } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { Header } from '../../components/commomheader/CommonHeader'
import { Surface } from 'react-native-paper'
import { AppFontFamily } from '../../components/constants/AppFonts'
import { AppTexts } from '../../components/constants/AppTexts'
import { ButtonPrimary } from '../../components/button/buttonPrimary'
import Carousel from 'react-native-reanimated-carousel';
import PaginationDot from 'react-native-animated-pagination-dot'


export default class Payment extends Component {
    constructor(props) {
        super(props);
        // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            selectedIndex: 0,
            screenWidth: Dimensions.get('screen').width,
            capsuleCategory: ['For You', 'Full Book', 'Story', 'Course', 'Novel'],
            currentCard: 0,
            //   corArr: [{ 'img': require('/Users/yatharthsingh/per/aooks/src/assets/img4.jpg'), 'genere': 'Sicence Fiction. Action' }, { 'img': require('../../assets/img5.jpg'), 'genere': 'Horror Comedy' }, { 'img': require('/Users/yatharthsingh/per/aooks/src/assets/img6.webp'), 'genere': 'Spy And Thriller' }],
        };
        // this.screenWidth = Dimensions.get('screen').width

    }

    _renderItem({ item, index }) {
        // setActiveCard(index, 'current index')
        return (
            <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('window').height * .7, alignItems: 'center', justifyContent: 'center' }}>
                {/* <ImageBackground source={require('../../assets/paymentcardbg.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover', alignItems: 'center' }}> */}
                <Surface elevation={4} style={{ padding: 10, width: '90%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image source={require('../../assets/paysuccess.png')} style={{ height: 60, width: 60, resizeMode: 'contain' }} />
                    <Text style={{ marginTop: 20, width: '80%', textAlign: 'center', fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsBold }}>
                        {'Few drivers have accepted your request'}
                    </Text>


                    <View style={{ width: '100%', alignItems: 'center', marginTop: 30, marginBottom: 10 }}>
                        <Surface elevation={4} style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>

                            <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                                <View style={{ width: '75%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

                                    <View style={{ width: '15%', alignItems: 'center' }}>

                                        <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                                        <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 40, resizeMode: 'contain' }} />
                                        <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />

                                    </View>

                                    <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>

                                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                                            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{'1, Thrale Street, London, SE19HW, UK'}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 0, width: '100%', height: 0 }}></View>
                                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                                            <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{'Ealing Broadway Shopping Centre, London, W55JY, UK'}</Text>
                                            </View>
                                        </View>

                                    </View>

                                </View>

                                <View style={{ width: '25%', alignItems: 'flex-end' }}>
                                    <Text style={{ paddingTop: 8, paddingRight: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 16, color: AppColors.themeText2Color }}>{AppTexts.Rupee_Symbol + '350'}</Text>
                                    <Text style={{ padding: 10, paddingTop: 5, paddingBottom: 0, fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeText2Color }}>{'2' + " seats left"}</Text>

                                </View>
                            </View>


                            <View style={{ width: '100%', marginTop: 20, marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                            <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
                                <Image source={require('../../assets/check.png')} style={{ marginRight: 5, width: 40, height: 40, borderRadius: 20, resizeMode: 'contain' }} />
                                <View style={{ justifyContent: 'center' }}>

                                    <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsSemiBold, fontSize: 16, color: AppColors.themeText2Color }}>{item.user_name ?? "Sachin Gupta"}</Text>
                                    <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeText2Color }}>{item.rating + " rating"}</Text>
                                </View>
                            </View>

                        </Surface>
                    </View>


                    <View style={{ width: '100%', height: 70, alignItems: 'center', marginTop: 30 }}>
                        <ButtonPrimary
                            text={'confirm ride'}
                            onPress={() => console.log('confirem')}
                            loader={false}
                        />
                    </View>


                </Surface>

                {/* </ImageBackground> */}
            </View>
        );
    }

    onIndexChange(currentCard) {
        console.log(currentCard, 'card')
        this.setState({ currentCard: currentCard })
    }


    PaymentCourousal() {
        return (
            <View style={{ marginTop: 20, height: Dimensions.get('window').height * 0.7, justifyContent: 'center' }}>

                <Carousel
                    // ref={(c) => { carouselRef = c }}
                    loop
                    autoPlay={false}
                    pagingEnabled={true}
                    // snapEnabled={true}
                    data={['1', '2']}
                    scrollAnimationDuration={1000}
                    renderItem={this._renderItem}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                    // onProgressChange={(_, absoluteProgress) =>
                    // (progressValue.value = absoluteProgress)
                    // console.log(absoluteProgress, k)
                    // onIndexChange(absoluteProgress)
                    // }
                    alignItems={'center'}
                    justifyContent={'center'}
                    width={this.state.screenWidth}
                    height={Dimensions.get('window').height * 0.7}

                    onSnapToItem={(id) => this.onIndexChange(id)}
                />
                {/* {bottomPaging()} */}
            </View>
        )
    }

    BottomPaging() {
        return (
          <View style={{ height: 20, width: this.state.screenWidth, marginTop: 30, alignItems: 'center' }}>
    
            <PaginationDot
              activeDotColor={AppColors.themePrimaryColor}
              inactiveDotColor={AppColors.themeTextGrayColor}
              curPage={this.state.currentCard}
              maxPage={2}
              sizeRatio={1.5}
            />
          </View>
        );
      }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center'}}>
                <Header isBack={false} close={() => this.props.navigation.openDrawer()} />
                {this.PaymentCourousal()}
                {this.BottomPaging()}

                {/* <FlatList
            data={['1', '2']}
            keyExtractor={(item, index) => index}
            horizontal={true}
            contentContainerStyle={{ height: Dimensions.get('window').height - 100, marginTop: 50 }}
            // ListHeaderComponent={this.headerView()}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            // extraData={this.state}
            // onEndReached={() => this.getCartList()}
            renderItem={({ item, index }) => (
                <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('window').height * .6, alignItems: 'center' }}>
                  
                        <Surface elevation={4} style={{ padding: 10, width: '90%', height: '100%', alignItems: 'center' }}>

                            <Image source={require('../../assets/paysuccess.png')} style={{ marginTop: 50, height: 60, width: 60, resizeMode: 'contain' }} />
                            <Text style={{ marginTop: 20, width: '80%', textAlign: 'center', fontSize: 16, color: AppColors.themeBlackColor, fontFamily: AppFontFamily.PopinsBold }}>
                                {'Few drivers have accepted your request'}
                            </Text>


                            <View style={{ width: '100%', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                <Surface elevation={4} style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>

                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                                        <View style={{ width: '75%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

                                            <View style={{ width: '15%', alignItems: 'center' }}>

                                                <Image source={require('../../assets/dotone.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />
                                                <Image source={require('../../assets/dotline.png')} style={{ marginLeft: 0, width: 5, height: 40, resizeMode: 'contain' }} />
                                                <Image source={require('../../assets/triangle.png')} style={{ marginLeft: 0, width: 10, height: 10, resizeMode: 'contain' }} />

                                            </View>

                                            <View style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>

                                                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                                                    <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{'1, Thrale Street, London, SE19HW, UK'}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ marginLeft: 0, width: '100%', height: 0 }}></View>
                                                <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row' }}>

                                                    <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={{ fontFamily: AppFontFamily.PopinsMedium, width: '100%', color: AppColors.themeTextPrimaryColor, fontSize: 12 }}>{'Ealing Broadway Shopping Centre, London, W55JY, UK'}</Text>
                                                    </View>
                                                </View>

                                            </View>

                                        </View>

                                        <View style={{ width: '25%', alignItems: 'flex-end' }}>
                                            <Text style={{ paddingTop: 8, paddingRight: 10, fontFamily: AppFontFamily.PopinsBold, fontSize: 16, color: AppColors.themeText2Color }}>{AppTexts.Rupee_Symbol + '350'}</Text>
                                            <Text style={{ padding: 10, paddingTop: 5, paddingBottom: 0, fontFamily: AppFontFamily.PopinsRegular, fontSize: 12, color: AppColors.themeText2Color }}>{'2' + " seats left"}</Text>

                                        </View>
                                    </View>


                                    <View style={{ width: '100%', marginTop: 20, marginBottom: 10, height: 2, backgroundColor: AppColors.themePickupDropSearchBg }}></View>
                                    <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
                                        <Image source={require('../../assets/check.png')} style={{ marginRight: 5, width: 40, height: 40, borderRadius: 20, resizeMode: 'contain' }} />
                                        <View style={{ justifyContent: 'center' }}>

                                            <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsSemiBold, fontSize: 16, color: AppColors.themeText2Color }}>{item.user_name ?? "Sachin Gupta"}</Text>
                                            <Text style={{ width: '100%', padding: 10, paddingTop: 0, paddingBottom: 0, fontFamily: AppFontFamily.PopinsMedium, fontSize: 12, color: AppColors.themeText2Color }}>{item.rating + " rating"}</Text>
                                        </View>
                                    </View>

                                </Surface>
                            </View>


                            <View style={{ width: '100%', height: 70, alignItems: 'center', marginTop: 10 }}>
                                <ButtonPrimary
                                    text={'confirm ride'}
                                    onPress={() => console.log('confirem')}
                                    loader={false}
                                />
                            </View>


                        </Surface>

                </View>
            )}
        /> */}


            </View>
        )
    }
}

