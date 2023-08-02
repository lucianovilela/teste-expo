import React, { cloneElement } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon, Text, Dialog } from '@rneui/themed';
import Constants from 'expo-constants';



import CalendarPicker from 'react-native-calendar-picker';

import moment from 'moment';

import { firestore, auth } from './firebase';
import { onSnapshot, collection, addDoc, Timestamp, deleteDoc, doc } from 'firebase/firestore';

const EditItemDialog = ({ visible1, toggleDialog1, item }) => {
    return (

        <Dialog
            isVisible={visible1}
            onBackdropPress={toggleDialog1}
        >
            <Dialog.Title title="Dialog Title" />
            <Text>
                <Icon
                    name='key'
                    type='antdesign'
                />
                &nbsp;{item?.uid}
            </Text>
            <Text>
                <Icon
                    name='calendar'
                    type='antdesign'
                />
                &nbsp;{moment(item?.data.seconds * 1000).format('LLL')}
            </Text>
            <Dialog.Actions>
                <Dialog.Button title="incluir" onPress={() => {
                    addDoc(collection(firestore, "agenda"), {

                        data: Timestamp.fromDate(item.data.toDate()),
                    })
                        .then(() => toggleDialog1())
                        .catch((err) => console.log(err));
                }} />
                <Dialog.Button title="cancel" onPress={toggleDialog1} />
            </Dialog.Actions>
        </Dialog>
    )
}

export default function Agenda() {

    const [visible1, setVisible1] = React.useState(false);
    const toggleDialog1 = () => setVisible1(!visible1)
    const [info, setInfo] = React.useState({
        user: null,
        agenda: [],
    });
    const [itemSel, setItemSel] = React.useState({});


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
                });
            });
            setInfo({ ...info, agenda: [...result], format: [...format] });
        })
    }, []);
    return (

        <View style={styles.container}>
            <EditItemDialog visible1={visible1} toggleDialog1={toggleDialog1} item={itemSel} />
            <CalendarPicker
                customDatesStyles={info.format}
                onDateChange={(data) => {
                    setItemSel({
                        user: info.user?.uid || null,
                        data: Timestamp.fromDate(data.toDate()),
                    });
                    toggleDialog1();

                    /*
                    
                    */
                }}

            />
            <FlatList
                data={info.agenda}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity onPress={(e) => {
                            deleteDoc(doc(firestore, `agenda/${item.uid}`))
                                .catch((err) => console.log(err))
                        }}>
                            <View style={{ marginBottom: 10 }}>

                                <Text>
                                    <Icon
                                        name='key'
                                        type='antdesign'
                                    />
                                    &nbsp;{item.uid}
                                </Text>
                                <Text>
                                    <Icon
                                        name='calendar'
                                        type='antdesign'
                                    />
                                    &nbsp;{moment(item.data.seconds * 1000).format('LLL')}
                                </Text>

                            </View>

                        </TouchableOpacity>
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
