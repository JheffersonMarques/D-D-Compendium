import { useNavigation } from "@react-navigation/core"
import React from "react"
import { Text, View } from "react-native"
import { IconedButton } from "../../components/SeachButton"

export const Home = (props) => {

    const nav = useNavigation()

    return (
        <View>
            <IconedButton text='Spells' icon={require('../../../assets/icons/spell_icon.png')} onPress={()=>{nav.navigate('Spells')}}></IconedButton>
            <IconedButton text='Monsters' icon={require('../../../assets/icons/monsters_icon.png')} onPress={()=>{nav.navigate('Monsters')}}></IconedButton>
        </View>
    )
}
