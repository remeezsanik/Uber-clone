import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';


const data = [
    {
        id: "Uber-X-123",
        title: "Uber X",
        multiplier: 3,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-XL-678",
        title: "Uber XL",
        multiplier: 6,
        image: "https://links.papareact.com/5x8",
    },
    {
        id: "Uber-LUX-777",
        title: "Uber LUX",
        multiplier: 9,
        image: "https://links.papareact.com/7pf",
    },
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView style={tw`bg-white flex-grow `}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("NavigateCard")}
                    style={tw`absolute top-3 left-5 p-3 rounded-full`}>
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a Ride -
                    {travelTimeInformation?.distance?.text}</Text>
            </View>

            <FileList
                data={data}
                KeyExtractor={(item) => item.id} renderItem={({ item: { id, title, multiplier, image } }) => {
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row items-center justify-between px-10
                         ${id === selected?.id && "bg-gray-200"}`}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={{ uri: image }}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text} travel time</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('en-gb', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(
                                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE
                                    * multiplier) / 100
                            )}

                        </Text>
                    </TouchableOpacity>
                }}
            />
            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected}
                    style={tw`bg-black py-3 m-3 rounded-full ${!selected && 'bg-gray-300'}`}>
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

