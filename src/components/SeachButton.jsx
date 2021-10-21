import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

export const SearchButton = ({ text, subText, onPress}) => {
    return (<TouchableOpacity style={style.button} onPress={onPress}>
        <Text>
            {text}
        </Text>
        <Text style={{fontSize:10}}>
            {subText}
        </Text>
    </TouchableOpacity>)
}

const style = StyleSheet.create({
    button:{
        backgroundColor: '#fff',
        padding: 10,
        marginHorizontal:10,
        marginVertical:5,
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