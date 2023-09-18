import React, { useEffect } from 'react'
import { View, Text, Alert, Image, FlatList, Dimensions } from 'react-native'
import { AppColors } from '../../components/constants/AppColor'
import { hitApiToGetRideList, hitApiToRequestARide } from './RideListModal';
import { Header } from '../../components/commomheader/CommonHeader';
import moment from 'moment';
import { AppTexts } from '../../components/constants/AppTexts';
import { convertToKms } from '../../components/commonfunction/CommonFunctions';
import { AppFontFamily } from '../../components/constants/AppFonts';
import { FindRideFilterView } from './FindRideComp';
import { Surface } from 'react-native-paper';
import { ButtonPrimary } from '../../components/button/buttonPrimary';
import CommonLoaders from '../../components/loader/Loader';
import { showNotification } from '../../components/notifications/LocalNotification';
import { hitApiToGetNotifications } from './NotificationModal';
export default function Notification({ navigation, route }) {


  const [notification, setNotification] = React.useState([])
  // const { data, seat } = route.params;
  // const [selectedIndex, setIndex] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [startLoader, setStartLoader] = React.useState(false)

  useEffect(() => {

    (async () => {


      await getNoti()


    })();

    return () => {
      // clear/remove event listener

    }
  }, []);



  const getNoti = async () => {
    setIsLoading(false)
    //Put your logic here
    const result = await hitApiToGetNotifications();
    console.log("notification", result);
    if (result.status) {
      setNotification(result.data)
    }
    else {

    }
    setIsLoading(true)
  }



  const ListView = () => {
    return (
      <>

        <FlatList
          data={notification}
          // refreshControl={
          //     <RefreshControl
          //         onRefresh={() => this.getCartList()}
          //         refreshing={this.state.isFetching}
          //         title={themes.appCustomTexts.PullToRefreshText}
          //         tintColor={themes.appColors.themeBackgroundBlackColor}
          //         titleColor={themes.appColors.themeBackgroundBlackColor}
          //     />
          // }
          keyExtractor={(item, index) => index}
          // ListHeaderComponent={this.headerView()}
          showsVerticalScrollIndicator={false}
          // extraData={this.state}
          // onEndReached={() => this.getCartList()}
          renderItem={({ item, index }) => (
            <View style={{ width: Dimensions.get('window').width, alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
              <Surface elevation={4} style={{ width: '95%', backgroundColor: AppColors.themesWhiteColor, borderRadius: 10 }}>

                <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row',  padding: 15 }}>

                  <View style={{ width: '13%', justifyContent: 'flex-start', alignItems: 'center' }}>

                    <Image source={require('../../assets/horn.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />

                  </View>

                  <View style={{ marginLeft: 20, width: '87%', justifyContent: 'flex-start' }}>

                    <Text style={{ fontSize: 15, fontFamily: AppFontFamily.PopinsMedium, color: AppColors.themeBlackColor }}>{item.description}</Text>
                    <Text style={{ fontSize: 13, fontFamily: AppFontFamily.PopinsRegular, color: AppColors.themeBlackColor }}>{item.title}</Text>

                  </View>

                  {/* <View style={{  width: '15%', justifyContent: 'flex-start' }}>



                  </View> */}

                </View>


              </Surface>
            </View>
          )}
        />

      </>
    )
  }

  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: AppColors.themePickupDropSearchBg, alignItems: 'center' }}>
      <Header close={() => { navigation.navigate('RideDrawer', { screen: 'FindRide', params: { from: 'reset' } }) }} text='Notifications' />




      {isLoading ?

        notification.length > 0 ? ListView()
          :
          CommonLoaders.NoDataInList('No notifications yet')

        : CommonLoaders.RideHistoryLoader()
      }



    </View>
  )
}
