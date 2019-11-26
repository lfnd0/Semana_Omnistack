import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage, TouchableOpacity, Text} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';
import { bold } from 'ansi-colors';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, []);
    
    function handleNavigateExit() {
        AsyncStorage.clear()
        navigation.navigate('Login')
    }

    return (
       <SafeAreaView sytle={styles.container}>
        <Image source={logo} sytle={styles.logo} />
        <TouchableOpacity onPress={() => handleNavigateExit()}>
            <Text style={styles.text}>Sair</Text>
        </TouchableOpacity>
           <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
           </ScrollView>
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },

    text: {
        fontSize: 14,
        marginRight: 12,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    }
});