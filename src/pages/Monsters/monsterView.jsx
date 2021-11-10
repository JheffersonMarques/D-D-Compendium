import { useRoute } from "@react-navigation/core"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { colors, damageIcons, utils } from "../../Utils"

export const MonsterView = () => {
    const route = useRoute()

    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true)

    const getDataFromApi = async (spell) => {
        try {
            const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${spell}`);
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => { getDataFromApi(route.params.monster) }, [])


    return (
        <ScrollView>
            {isLoading ? <LoadingIndicator /> : (
                <View style={style.header}>

                    <View style={[style.headerTitle, { backgroundColor: colors.primary }]}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            {data.name}
                        </Text>
                        <Text style={{ color: 'white', fontSize: 12, fontStyle: "italic" }}>
                            {data.type.charAt(0).toUpperCase() + data.type.substring(1)}
                        </Text>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>

                            <Text style={{ color: 'white', fontSize: 12, fontStyle: "italic" }}>
                                Challenge Rating : {data.challenge_rating}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 12, fontStyle: "italic" }}>
                                XP : {data.xp} points
                            </Text>
                        </View>
                    </View>
                    <View style={style.content}>

                        <Text>HP : {data.hit_points} HP</Text>
                        <Text>Size : {data.size}</Text>
                        <Text>Alignment : {data.alignment}</Text>
                        <Text>Armor Class : {data.armor_class}</Text>
                        <Text>Hit Dice : {data.hit_dice}</Text>
                        <Text>Languages : {data.languages}</Text>
                        <Text style={utils.bold}>Speeds :</Text>
                        <Text style={utils.italic}>{JSON.stringify(data.speed).replace(/\"/g, "").replace(/:/g, " : ").replace(/,/g, ",\n").replace('{', '').replace('}', '').split(',')}</Text>
                        <Text style={utils.bold}>Stats : </Text>
                        <Text>Strength : {data.strength == undefined ? 0 : data.strength}</Text>
                        <Text>Dexterity : {data.dexterity == undefined ? 0 : data.dexterity}</Text>
                        <Text>Constitution : {data.constitution == undefined ? 0 : data.constitution}</Text>
                        <Text>Intelligence : {data.intelligence == undefined ? 0 : data.intelligence}</Text>
                        <Text>Wisdom : {data.wisdom == undefined ? 0 : data.wisdom}</Text>
                        <Text>Charisma : {data.charisma == undefined ? 0 : data.charisma}</Text>
                        {data.proficiencies.length == 0 ? false : (
                            <View>
                                <Text style={utils.bold}>Proficiencies : </Text>
                                <View>{data.proficiencies.map((d) => {
                                    return (<Text>{d.proficiency.name} : {d.value}</Text>)
                                })}</View>
                            </View>
                        )}
                        {data.damage_vulnerabilities.length == 0 ? false : (
                            <View>
                                <Text style={utils.bold}>Damage Vulnerabilities : </Text>
                                <View>
                                    {data.damage_vulnerabilities.map((d) => {
                                        return <Text>{d}</Text>
                                    })}
                                </View>
                            </View>
                        )}
                        {data.damage_resistances.length == 0 ? false : (
                            <View>
                                <Text style={utils.bold}>Damage Resistances : </Text>
                                <View>
                                    {data.damage_resistances.map((d) => {
                                        return <Text>{d}</Text>
                                    })}
                                </View>
                            </View>
                        )}
                        {data.damage_immunities.length == 0 ? false : (
                            <View>
                                <Text style={utils.bold}>Damage Immunities : </Text>
                                <View>
                                    {data.damage_immunities.map((d) => {
                                        return <Text>{d}</Text>
                                    })}
                                </View>
                            </View>
                        )}
                        {data.condition_immunities.length == 0 ? false : (
                            <View>
                                <Text style={utils.bold}>Condition Immunities : </Text>
                                <View>
                                    {data.condition_immunities.map((d) => {
                                        return <Text>{d.name}</Text>
                                    })}
                                </View>
                            </View>
                        )}
                        {data.senses == undefined ? false : (
                            <View>
                                <Text style={utils.bold}>Senses : </Text>
                                <View>
                                    <Text>
                                        {JSON.stringify(data.senses).replace(/\"/g, "").replace(/:/g, " : ").replace(/,/g, ",\n").replace('{', '').replace('}', '').replace(/passive_perception/g, 'Passive Percetion').replace(/darkvision/g, 'Dark Vision').replace(/blindsight/g, 'Blindsight').split(',')}
                                    </Text>
                                </View>
                            </View>
                        )}
                        {data.proficiencies == undefined ? false : (
                            <View>
                                <Text style={utils.bold}>Proficiencies : </Text>
                                <View>
                                    {data.proficiencies.map((d) => {
                                        return (<Text>{d.proficiency.name} : {d.value}</Text>)
                                    })}
                                </View>
                            </View>
                        )}
                        {data.special_abilities == undefined ? false : (
                            <View>
                                <Text style={utils.bold}>Special Abilities : </Text>
                                <View>
                                    {data.special_abilities.map((d) => {
                                        return (
                                            <View>
                                                <Text style={[utils.bold, utils.italic, { paddingTop: 10 }]}>
                                                    {d.name}
                                                </Text>
                                                <Text style={{ textAlign: 'justify' }}>{d.desc}</Text>
                                                {d.usage == undefined ? false : (
                                                    <Text>
                                                        Usage : {d.usage.times} times {d.usage.type}
                                                    </Text>
                                                )}
                                                {d.spellcasting == undefined ? false : (
                                                    <View>
                                                        <Text>
                                                            - Spellcasting : {d.spellcasting.ability.name} with DC of {d.spellcasting.dc}
                                                        </Text>
                                                        {d.spellcasting.components_required.length == 0 ? false : (
                                                            <Text>
                                                                Components : {d.spellcasting.components_required + ""}
                                                            </Text>
                                                        )}
                                                        <Text style={utils.bold}>Spells : </Text>
                                                        {d.spellcasting.spells.map((d2) => {
                                                            return (<Text>
                                                                    -  {d2.name} at {d2.level} LvL {d2.usage == undefined ? false : (
                                                                    <Text>(Usage : {d2.usage.times} times {d2.usage.type})</Text>
                                                                )}
                                                            </Text>)
                                                        })}
                                                    </View>
                                                )}
                                            </View>
                                        )

                                    })}
                                </View>
                            </View>
                        )}

                        {data.actions == undefined ? false : (
                            <View>
                                <Text style={[utils.bold, { paddingTop: 10 }]}>Actions : </Text>
                                {data.actions.map((d) => {
                                    return (
                                        <View>
                                            <Text style={[utils.bold, utils.italic, { paddingTop: 10 }]}>{d.name}</Text>
                                            <Text style={{ textAlign: 'justify' }}>{d.desc}</Text>
                                            {d.options == undefined ? false : (
                                                <View>
                                                    <Text>Can Choose {d.options.choose} from : </Text>
                                                    {d.options.from.map((d2) => {
                                                        return (
                                                            d2.map((d3) => {
                                                                return (
                                                                    <Text> - {d3.name} : {d3.count} ({d3.type})</Text>
                                                                )
                                                            })
                                                        )
                                                    })}
                                                </View>
                                            )}
                                            {d.usage == undefined ? false : (
                                                <Text>Usage : {d.usage.type} {d.usage.type != "recharge on roll" ? (`(${d.usage.times}x)`) : (
                                                    <Text>{d.usage.dice}:{d.usage.min_value}</Text>
                                                )}</Text>
                                            )}
                                            {d.attack_bonus == undefined ? false : (
                                                <Text>With attack bonus of {d.attack_bonus}</Text>
                                            )}
                                            {d.damage == undefined || d.damage.length == 0 ? false : (
                                                <View>
                                                    <Text style={utils.italic}>Damage : </Text>
                                                    <View>
                                                        {d.damage.map((d2) => {
                                                            return (
                                                                <Text> - {damageIcons[d2.damage_type.index]} {d2.damage_type.name} : {d2.damage_dice}</Text>
                                                            )
                                                        })}
                                                    </View>
                                                </View>
                                            )}
                                            {d.dc == undefined ? false : (
                                                <View>
                                                    <Text>DC : {d.dc.dc_type.name} {d.dc.dc_value} ({d.dc.success_type})</Text>
                                                </View>
                                            )}
                                        </View>
                                    )
                                })}
                            </View>
                        )}

                        {data.legendary_actions == undefined ? false : (
                            <View>
                                <Text style={utils.bold}>Legendary Actions : </Text>
                                <View>
                                    {data.legendary_actions.map((d) => {
                                        return (<View>
                                            <Text style={[utils.bold, utils.italic, { paddingTop: 10 }]}>{d.name}</Text>
                                            <Text style={{ textAlign: 'justify' }}>{d.desc}</Text>
                                            {d.options == undefined ? false : (
                                                <View>
                                                    <Text>Can Choose {d.options.choose} from : </Text>
                                                    {d.options.from.map((d2) => {
                                                        return (
                                                            d2.map((d3) => {
                                                                return (
                                                                    <Text> - {d3.name} : {d3.count} ({d3.type})</Text>
                                                                )
                                                            })
                                                        )
                                                    })}
                                                </View>
                                            )}
                                            {d.attack_bonus == undefined ? false : (
                                                <Text>With attack bonus of {d.attack_bonus}</Text>
                                            )}
                                            {d.usage == undefined ? false : (
                                                <Text>Usage : {d.usage.type} {d.usage.type != "recharge on roll" ? (`(${d.usage.times}x)`) : (
                                                    <Text>{d.usage.dice}:{d.usage.min_value}</Text>
                                                )}</Text>
                                            )}
                                            {d.damage == undefined || d.damage.length == 0 ? false : (
                                                <View>
                                                    <Text style={utils.italic}>Damage : </Text>
                                                    <View>
                                                        {d.damage.map((d2) => {
                                                            return (
                                                                <Text> - {damageIcons[d2.damage_type.index]} {d2.damage_type.name} : {d2.damage_dice}</Text>
                                                            )
                                                        })}
                                                    </View>
                                                </View>
                                            )}
                                            {d.dc == undefined ? false : (
                                                <View>
                                                    <Text>DC : {d.dc.dc_type.name} {d.dc.dc_value} ({d.dc.success_type})</Text>
                                                </View>
                                            )}
                                        </View>)
                                    })}
                                </View>
                            </View>
                        )}

                    </View>
                </View>
            )}
        </ScrollView>
    )
}

const style = StyleSheet.create({
    header: {
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
    headerTitle: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 10,
        borderBottomColor: "#848484",
        borderBottomWidth: 2
    },
    content: {
        padding: 10,
        borderRadius: 5,

    }
})