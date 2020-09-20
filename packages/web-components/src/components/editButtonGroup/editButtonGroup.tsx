import React, { ReactNode } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/ArrowBack';
import DiscardIcon from '@material-ui/icons/Cancel';
import { PreSaveDialog, PreDiscardDialog } from '../index';

export interface EditButtonGroupProps {
    editMode: boolean;
    dirty: boolean;
    handleClickEdit: () => any;
    handleClickSave: () => any;
    handleClickDiscard: () => any;
    handleClickBack: () => any;
}

interface State {
    showPreSaveDialog: boolean;
    showPreDiscardDialog: boolean;
    showPreBackDialog: boolean;
}

export class EditButtonGroup extends React.Component<
    EditButtonGroupProps,
    State
> {
    constructor(props: EditButtonGroupProps) {
        super(props);
        this.state = {
            showPreSaveDialog: false,
            showPreDiscardDialog: false,
            showPreBackDialog: false
        };
    }

    handleClickSave = () =>
        this.setState({
            showPreSaveDialog: true,
            showPreDiscardDialog: false,
            showPreBackDialog: false
        });

    handleClickDiscard = () =>
        this.setState({
            showPreSaveDialog: false,
            showPreDiscardDialog: true,
            showPreBackDialog: false
        });

    handleClickBack = () =>
        this.setState({
            showPreSaveDialog: false,
            showPreDiscardDialog: false,
            showPreBackDialog: true
        });

    reset = (afterReset?: () => any): void =>
        this.setState(
            {
                showPreSaveDialog: false,
                showPreDiscardDialog: false,
                showPreBackDialog: false
            },
            afterReset
        );

    handleClickConfirmSave = (): void =>
        this.reset(this.props?.handleClickSave);

    handleClickConfirmDiscard = (): void =>
        this.reset(this.props?.handleClickDiscard);

    handleClickConfirmBack = (): void =>
        this.reset(this.props?.handleClickBack);

    handleClickConfirmCancel = (): void => this.reset();

    render(): ReactNode {
        const { editMode, handleClickEdit, dirty } = this.props;
        const {
            showPreSaveDialog,
            showPreDiscardDialog,
            showPreBackDialog
        } = this.state;
        return editMode ? (
            <ButtonGroup
                color="primary"
                variant="contained"
                aria-label="Edit Button Group"
            >
                <PreSaveDialog
                    show={showPreSaveDialog}
                    handleClickSave={this.handleClickConfirmSave}
                    handleClickDiscard={this.handleClickDiscard}
                    handleClickCancel={this.handleClickConfirmCancel}
                />
                <PreDiscardDialog
                    show={showPreDiscardDialog}
                    handleClickDiscard={this.handleClickConfirmDiscard}
                    handleClickCancel={this.handleClickConfirmCancel}
                />
                <PreDiscardDialog
                    show={showPreBackDialog}
                    handleClickDiscard={this.handleClickConfirmBack}
                    handleClickCancel={this.handleClickConfirmCancel}
                />
                <Button
                    aria-label="edit"
                    onClick={this.handleClickSave}
                    disabled={!dirty}
                >
                    <SaveIcon />
                </Button>
                <Button
                    aria-label="edit"
                    onClick={this.handleClickDiscard}
                    disabled={!dirty}
                >
                    <DiscardIcon />
                </Button>
                <Button
                    aria-label="edit"
                    onClick={
                        dirty
                            ? this.handleClickBack
                            : this.handleClickConfirmBack
                    }
                >
                    <CancelIcon />
                </Button>
            </ButtonGroup>
        ) : (
            <Button
                color="primary"
                variant="contained"
                aria-label="edit"
                onClick={handleClickEdit}
            >
                <EditIcon />
            </Button>
        );
    }
}
