import {Component, Inject, OnInit} from '@angular/core';
import { sha256 } from 'js-sha256';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {PopupDialogComponent} from './popup-dialog/popup-dialog.component';
import {ErrorPopupDialogComponent} from './error-popup-dialog/error-popup-dialog.component';


function hashString(blockContent: string, previousHash: string): any {
  let hash = ' ';
  const len = blockContent.length;
  const word = blockContent + previousHash;
  if (len === 0) {
    return hash;
  }
  hash = sha256(word);
  return hash;
}


function validProof(lastProof: string, proof: number) {

  const convertedNumber: string = proof.toString();
  const testedProof: string = lastProof + convertedNumber;
  console.log(sha256(testedProof));
  const guessedHash = sha256(testedProof);
  return guessedHash.slice(guessedHash.length - 2);
}

function hashSolver(lastProof: string): any {
  let proof = 0;
  while (validProof(lastProof, proof) !== '00') {
    proof += 1;
  }
  return validProof(lastProof, proof);
}

function setElementsOfBlock(block, blockId, user, card, cardId, blockHash, blockParent, blockStatus) {
  block.blockId = blockId;
  block.user = user;
  block.card = card;
  block.cardId = cardId;
  block.blockHash = blockHash;
  block.blockParent = blockParent;
  block.blockStatus = blockStatus;
}

function addBlockToBlockChain(block): any {
  const referenceChain = [];
  for (const elements in block) {
    if (block.hasOwnProperty(elements)) {
      referenceChain[elements] = block[elements];
    }
  }
  return referenceChain;
}


@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})

export class BlockchainComponent implements OnInit {

  blockId: number;
  user: string;
  card: string;
  cardId: string;
  blockHash: string;
  blockParent: string;
  blockStatus: boolean;
  blockchain = [];
  block: any =
    {
      blockId: this.blockId,
      user: this.user,
      card: this.card,
      cardId: this.cardId,
      blockParent: this.blockParent,
      blockHash: this.blockHash,
      blockStatus: this.blockStatus
    };


  constructor(
    public dialog: MatDialog) {}

  ngOnInit() {
  }

  onClickedValidate(event: any) {

    const solvedHash = hashSolver(this.block.blockHash.toString());
    const cardId = event.currentTarget.id;
    const elementId = 'block' + cardId;

    if (cardId === '0') {
      this.blockchain[cardId].blockStatus = true;
      document.getElementById(elementId).style.backgroundColor = 'lightgreen';
    } else {
      if (this.blockchain[cardId - 1].blockStatus === true) {
        this.blockchain[cardId].blockStatus = true;
        document.getElementById(elementId).style.backgroundColor = 'lightgreen';
      } else {
        const dialogRef = this.dialog.open(ErrorPopupDialogComponent, {
          data: {message: 'Cannot Validate Block: Previous Block(s) Need To be Validated First',
          confirmButtonText: 'Cancel'}
        });
      }
    }
  }

  openAddBlockPopUpDialog() {
    const dialogRef = this.dialog.open(
        PopupDialogComponent, {
        data: {blockContent: ' '}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result.user;
        this.card = result.card;
        this.cardId = result.cardId;
        if  (this.blockchain.length === 0) {
          this.blockParent = '00000000000000000000000000';
        } else {
          this.blockParent = this.blockchain[this.blockchain.length - 1].blockHash;
        }
        const userAndCard = this.user + this.card + this.cardId;
        this.blockHash = hashString(userAndCard, this.blockParent);
        this.blockStatus = false;

        this.blockId = this.blockchain.length;
        setElementsOfBlock(this.block, this.blockId, this.user, this.card, this.cardId, this.blockHash, this.blockParent, this.blockStatus);
        this.blockchain.push(addBlockToBlockChain(this.block));
      }
    });
  }

  onDeleteLastBlock() {
    const removedBlock = this.blockchain.pop();
  }


  onDeleteAllBlocks() {
    const dialogRef = this.dialog.open(ErrorPopupDialogComponent, {
      data: {message: 'Are you sure you want to delete all Blocks?',
      confirmButtonText: 'Confirm'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.blockchain = [];
      }
    });
  }
}

