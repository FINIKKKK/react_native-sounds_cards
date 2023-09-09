import React from "react";
import {StyleSheet} from "react-native";
import {CardsLayout} from "../../layouts/cards";
import {Card} from "../../components/Card";

/**
 * Screen ----------------
 */
export const CategoryScreen: React.FC = () => {
    return (
        <CardsLayout title="Карточки слов">
            {Array(24).fill(0).map((_, index) => (
                    <Card key={index}/>
                )
            )}
        </CardsLayout>
    );
};


/**
 * Styles ----------------
 */
const ss = StyleSheet.create({})

