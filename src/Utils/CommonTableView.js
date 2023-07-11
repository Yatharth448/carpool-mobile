import React from "react";
import {
    View,
    FlatList,
    Platform,
    RefreshControl
} from 'react-native';
import themes from "./Themes";

const TableView = {

    List: (data, headerView, footerView, itemView, paddingBottom = 150, onRefresh, isFetching)  => {
        const refreshController = onRefresh ? <RefreshControl
            onRefresh={() => onRefresh()}
            refreshing={isFetching}
            title={themes.appCustomTexts.PullToRefreshText}
            tintColor={themes.appColors.themeBackgroundBlackColor}
            titleColor={themes.appColors.themeBackgroundBlackColor}
        /> : <></>;
        return (
            <View style={{ width: '100%', marginTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: paddingBottom }}
                    refreshControl={
                        refreshController
                    }
                        ListHeaderComponent={headerView ? headerView : null}
                        ListFooterComponent={footerView ? footerView : null}
                        data={data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => 
                           itemView[index]}
                    />
            </View>
        )
    }

}
export default TableView