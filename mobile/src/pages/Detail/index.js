import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import logoImg from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer'

import styles from './styles'


export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const { name, title, description, value, email, whatsapp, } = incident

    const message = `Olá ${name}, estou entrando em contado, pois gostaria de ajudar no caso: ${title} , com o valor de ${formataValor()}`;

    function navigateToProfile() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${title}`,
            recipients: [`${email}`],
            body: message,
        });
    }

    function formataValor() {
        return Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)
    }


    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${whatsapp}&text=${message}`);
    }


    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <TouchableOpacity onPress={navigateToProfile}>
                    <Feather name="arrow-left" size={28} color="#e82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{name}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{description}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={value}>
                    {
                        formataValor()
                    }
                </Text>


            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o Dia!</Text>
                <Text style={styles.heroTitle}>Seja o Herói deste caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendWhatsapp}
                    >
                        <Text style={styles.actionText}> WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendMail}
                    >
                        <Text style={styles.actionText}> E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}