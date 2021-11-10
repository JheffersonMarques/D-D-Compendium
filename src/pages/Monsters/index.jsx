import React, { useEffect, useState } from "react"
import { View, FlatList, StyleSheet, TextInput, Text, Platform, Dimensions } from "react-native";
import { SearchButton } from "../../components/SeachButton";
import { LoadingIndicator } from '../../components/LoadingIndicator'
import { useNavigation } from "@react-navigation/core";

export const Monsters = () => {
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true)


    const navigation = useNavigation();
    const getDataFromApi = async (searchterm) => {
        try {
            const response = await fetch(`https://www.dnd5eapi.co/api/monsters?name=${searchterm}`);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => { getDataFromApi('') }, [])
    return (

        <View style={{flex:1}}>
            { isLoading ? <LoadingIndicator /> : (
            <View style={style.container}>
                <TextInput style={style.input} onChangeText={(e) => { getDataFromApi(e) }} />
                <FlatList
                    data={data.results}
                    keyExtractor={item => item.index}
                    renderItem={item => {
                        return (
                            <SearchButton text={item.item.name} subText={item.item.index} onPress={() => { navigation.navigate('Monster View', { monster: item.item.index }) }}></SearchButton>
                        )
                    }}
                />
            </View>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        marginHorizontal: 10,
        marginTop:10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})