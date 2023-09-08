import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import ChatWootWidget from '@chatwoot/react-native-widget';
import { connect } from 'react-redux';
import { getProfileDataRequest } from '../../redux/actions/actions';

function Support({ data, loading, error, getProfileDataRequest, navigation, route }) {
    const [showWidget, toggleWidget] = useState(false);
    const user = {
        identifier: data._id,
        name: data.name,
        avatar_url: '',
        email: data.email,
        identifier_hash: '',
    };
    //   const customAttributes = { accountId: 1, pricingPlan: 'paid', status: 'active' };
    const websiteToken = '7PNrR9Khwuhx2M2kUtrkknWS';
    const baseUrl = 'https://app.chatwoot.com';
    const locale = 'en';

    useEffect(() => {
        console.log(data)
    })

    return (
        <SafeAreaView style={styles.container}>
            {/* <View>
        <TouchableOpacity style={styles.button} onPress={() => toggleWidget(true)}>
          <Text style={styles.buttonText}>Open widget</Text>
        </TouchableOpacity>
      </View>
      {
        showWidget&& */}
            <ChatWootWidget
                websiteToken={websiteToken}
                locale={locale}
                baseUrl={baseUrl}
                closeModal={() => navigation.goBack()}
                isModalVisible={true}
                user={user}
            // customAttributes={customAttributes}
            />
            {/* } */}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        height: 48,
        marginTop: 32,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#1F93FF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        fontWeight: '600',
        fontSize: 16,
        paddingRight: 10,
    },
});

const mapStateToProps = (state) => ({
    data: state.data,
    loading: state.loading,
    error: state.error,
});

const mapDispatchToProps = {
    getProfileDataRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);