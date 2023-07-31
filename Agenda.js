import React, { cloneElement } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Constants from 'expo-constants';

import CalendarPicker from 'react-native-calendar-picker';

import moment from 'moment';

import { firestore, auth } from './firebase';
import { onSnapshot, collection, addDoc, Timestamp, deleteDoc } from 'firebase/firestore';

export default function Agenda() {

    const [info, setInfo] = React.useState({
        user: null,
        agenda: [],
    });
    React.useEffect(() => {

        onSnapshot(collection(firestore, "agenda"), (snap) => {
            const result = [];
            const format = []
            snap.forEach((doc) => {
                result.push({ uid: doc.id, ...doc.data() });
                format.push({
                    date: moment(doc.data().data.seconds * 1000),
                    style: {
                        backgroundColor: "#ff00FF",
                    },
                })
            });
            setInfo({ ...info, agenda: [...result], format: [...format] });
        })
    }, []);
    return (

        <View style={styles.container}>

            <CalendarPicker
                customDatesStyles={info.format}
                onDateChange={(data) => {
                    addDoc(collection(firestore, "agenda"), {
                        user: info.user?.uid || null,
                        data: Timestamp.fromDate(data.toDate()),
                    }).catch((err) => console.log(err));
                }}
            />
            <FlatList
                data={info.agenda}
                renderItem={({ item }) => (
                    <View>
                        <Text>
                            key={item.uid}
                            title={moment(item.data.seconds * 1000).format('LLL')}
                            description={item.uid}

                            left={() => (
                                <View
                                    icon="trash-can"
                                    size={50}

                                    onPress={(e) => {
                                        
                                        firestore()
                                            .collection('agenda')
                                            .doc(item.uid)
                                            .delete()
                                            .catch((err) => console.log(err));
                                    }}
                                />
                            )

                            }
                        </Text>
                    </View>)}
            />


        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});
