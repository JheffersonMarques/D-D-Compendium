import { StyleSheet } from "react-native"

export const spellSchools = {
    'evocation': {backgroundColor :'#b50000'},
    'necromancy': {backgroundColor : 'black'},
    'enchantment': {backgroundColor : '#067500'},
    'abjuration': {backgroundColor : '#ffffff'},
    'conjuration': {backgroundColor : '#0d61d6'},
    'illusion': {backgroundColor : '#e0612b'},
    'transmutation': {backgroundColor : '#e3a814'},
    'divination' : {backgroundColor : '#9600db'}
}

export const colors = {
    primary:'#9600DB',
    secondary:'#90334F',
    terceary:'#E60F6F'
}

export const utils = StyleSheet.create({
    italic:{
        fontStyle:'italic'
    },
    bold : {
        fontWeight:'bold'
    }
})

export const damageIcons = {
    'acid' : '๐งช',
    'bludgeoning' : '๐',
    'cold' : 'โ',
    'fire' : '๐ฅ',
    'force' : 'โจ',
    'lightning' : '๐ฉ',
    'necrotic' : '๐',
    'piercing' : '๐ก',
    'poison' : 'โ ',
    'psychic' : '๐ซ',
    'radiant' : 'โ',
    'slashing' : 'โ',
    'thunder' : 'โก'
}