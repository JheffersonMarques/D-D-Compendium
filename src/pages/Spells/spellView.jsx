import { useRoute } from "@react-navigation/core"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { damageIcons, spellSchools } from "../../Utils"

export const SpellView = () => {
    const route = useRoute()

    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true)

    const getDataFromApi = async (spell) => {
        try {
            const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spell}`);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => { getDataFromApi(route.params.spell) }, [])


    return (
        <ScrollView>
            {isLoading ? <LoadingIndicator /> : (
                <View style={style.spell}>
                    <View style={[style.spellTitle, spellSchools[data.school.index]]}>
                        <Text style={{ color: data.school.index != 'abjuration' ? 'white' : 'black', fontSize: 18 }}>
                            {data.name}
                        </Text>
                        <Text style={{ color: data.school.index != 'abjuration' ? 'white' : 'black', fontSize: 12, fontStyle: "italic" }}>
                            {data.level == 0 ? 'Cantrip of ' : `${data.level}° Level of `}{data.school.name}
                        </Text>
                    </View>

                    <View style={style.content}>

                        <View>
                            <Text>
                                Range: {data.range}
                            </Text>
                            <Text>
                                Components: {data.components + ""}
                            </Text>
                            {data.material == undefined ? false : (<Text>
                                Material: {data.material}
                            </Text>)
                            }
                            <Text>
                                Ritual: {data.ritual ? "No" : "Yes"}
                            </Text>
                            <Text>
                                Duration: {data.duration}
                            </Text>
                            <Text>
                                Casting Time: {data.casting_time}
                            </Text>
                        </View>
                        {/* Damage Stuff */}
                        <View>
                            {data.damage == undefined ? false : (
                                <View>
                                    {data.damage.damage_type == undefined ? false : (
                                        <Text>
                                            Damage Type: {damageIcons[data.damage.damage_type.index]} {data.damage.damage_type.name}
                                        </Text>
                                    )}
                                    {/* Damage at Slot */}
                                    <View>
                                        {data.damage.damage_at_slot_level == undefined ? false : (
                                            <View>
                                                <Text style={{ fontWeight: 'bold' }}>
                                                    Damage At Slot Level :
                                                </Text>
                                                <Text>
                                                    {JSON.stringify(data.damage.damage_at_slot_level).replace(/\"/g, "").replace(/:/g, "° Level : ").replace(/,/g, ",\n").replace('{', '').replace('}', '').split(',')}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                    {/* Damage at Char level */}
                                    <View>
                                        {data.damage.damage_at_character_level == undefined ? false : (
                                            <View>
                                                <Text style={{ fontWeight: 'bold' }}>
                                                    Damage At Character Level :
                                                </Text>
                                                <Text>
                                                    {JSON.stringify(data.damage.damage_at_character_level).replace(/\"/g, "").replace(/:/g, "° Level : ").replace(/,/g, ",\n").replace('{', '').replace('}', '').split(',')}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            )}
                        </View>
                        {/* Heal at Slot */}
                        <View>
                            {data.heal_at_slot_level == undefined ? false : (
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        Heal At Slot Level :
                                    </Text>
                                    <Text>
                                        {JSON.stringify(data.heal_at_slot_level).replace(/\"/g, "").replace(/:/g, "° Level : ").replace(/,/g, ",\n").replace('{', '').replace('}', '').split(',')}
                                    </Text>
                                </View>
                            )}
                        </View>
                        {/* Description */}
                        <View>
                            <Text style={{ fontWeight: "bold" }}>
                                Description :
                            </Text>
                            {data.desc.map((d, idx) => {
                                return (
                                    <Text style={{ textAlign: "justify" }}>
                                        {d}
                                    </Text>
                                )
                            })}
                        </View>
                        {/* At Higher Levels */}
                        <View>
                            {data.higher_level == undefined ? false : (<View>
                                <Text style={{ fontWeight: "bold" }}>At Higher Levels :</Text>
                                {data.higher_level.map((d, idx) => {
                                    return (
                                        <Text style={{ textAlign: "justify" }}>
                                            {d}
                                        </Text>
                                    )
                                }
                                )}
                            </View>)
                            }
                        </View>
                        {/* DC */}
                        <View>
                        {data.dc == undefined ? false : (
                            <Text>DC : {data.dc.dc_type.name} ({data.dc.dc_success}) {data.dc.desc == undefined ? '' : `(${data.dc.desc})`} </Text>
                        )}
                        </View>
                        {/* Area Of Effect */}
                        <View>
                            {data.area_of_effect == undefined ? false : (
                                <Text>
                                    Area of Effect : {data.area_of_effect.type} = {data.area_of_effect.size}
                                </Text>
                            )}
                        </View>
                        {/* Class */}
                        <View>
                            <Text style={{ fontWeight: "bold" }}>
                                Class :
                            </Text>
                            {data.classes.map((d) => {
                                return (
                                    <Text>
                                        {d.name}
                                    </Text>
                                )
                            })}
                        </View>
                        {/* Subclasses */}
                        <View>
                            {data.subclasses.length == 0 ? false : (
                                <View>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        Subclasses :
                                    </Text>
                                    {data.subclasses.map((d) => {
                                        return (
                                            <Text>
                                                {d.name}
                                            </Text>
                                        )
                                    })}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    )
}

const style = StyleSheet.create({
    spell: {
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    spellTitle: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 10,
        borderBottomColor: "#848484",
        borderBottomWidth: 2
    },
    content: {
        padding: 10,

    }
})