import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import TopHeaderRecolte from '../composant/TopHeaderRecolte'
import { useFocusEffect, useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';

const AfectionBin = () => {
    // const appContext = useAppContext();
    const [searchText, setSearchText] = useState('');
    const [isSynch, setIsSynch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const navigation = useNavigation();
    const [parcelSelected, setParcelSelected] = useState<string | ''>();
    const [nameParcelSelected, setNameParcelSelected] = useState<string | ''>();
    const [idParcelSelected, setIdParcelSelected] = useState<number | null>(null);
    const { t } = useTranslation('AFFECTATION_BIN_PARCELLE');
    // const [filteredParcelles, setFilteredParcelles] = useState(appContext.parcelleListe.current || []);

    const [isPressed, setIsPressed] = useState(false);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            // setParcelSelected();
            setSearchText('');
            setIsSearch(false);
            // handleStopScanContinue();
        }, []),
    );
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <TopHeaderRecolte
                iconReturn="chevron-left"
                title={t('AFFECTATION_BIN_PARCELLE:TITLE_PARCELLE')}
                titleBold={`${t('AFFECTATION_BIN_PARCELLE:TITLE_PARCELLE_BOLD')} (${""})`}
                subTitle={t('AFFECTATION_BIN_PARCELLE:SUB_TITLE_PARCELLE')}
                searchText={searchText}
                setSearchText={setSearchText}
                placeholder={t('AFFECTATION_BIN_PARCELLE:TEXT_SEARCH')}
                isSearch={isSearch}
                handleSearch={() => { }}
                handleReturn={() => { }}
                isPressed={isPressed}
                search={true}
                countResult={``}
                isKeyboardVisible={isKeyboardVisible}
                clearText={() => setSearchText('')}
                process="affectationBinParcelle"
                setIsSync={setIsSynch}
                isSynch={true}
            />
        </View>
    )
}

export default AfectionBin

const styles = StyleSheet.create({})