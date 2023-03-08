import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonCard,
  IonItem,
  IonButton,
  IonIcon,
  IonLabel,
  IonInput,
} from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Supplier from './Supplier';
import { saveSupplier, searchSupplierById } from './SupplierApi';
import './SupplierList.css';
const SupplierEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>();
  const history = useHistory();
  const [supplier, setSupplier] = useState<Supplier>({});

  const save = () => {
    saveSupplier(supplier);
    history.push('/page/Suppliers');
  };

  const search = () => {
    if (id === 'new') {
      setSupplier({});
    } else {
      const result = searchSupplierById(id);
      setSupplier(result);
    }
  };
  useEffect(() => {
    search();
  }, [history.location.pathname]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name || 'Proveedores'} </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonTitle>
            {id === 'new' ? 'Agregar Proveedor' : 'Editar Proveedor'}{' '}
          </IonTitle>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Nombre</IonLabel>
                <IonInput
                  onIonChange={(e) => (supplier.name = String(e.detail.value))}
                  value={supplier.name}
                  placeholder='Enter your name'
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Email</IonLabel>
                <IonInput
                  onIonChange={(e) => (supplier.email = String(e.detail.value))}
                  value={supplier.email}
                  placeholder='Enter your email'
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Dirección</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (supplier.address = String(e.detail.value))
                  }
                  value={supplier.address}
                  placeholder='Enter your address'
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Teléfono</IonLabel>
                <IonInput
                  onIonChange={(e) => (supplier.phone = String(e.detail.value))}
                  value={supplier.phone}
                  placeholder='Enter your phone number'
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Web</IonLabel>
                <IonInput
                  onIonChange={(e) => (supplier.web = String(e.detail.value))}
                  value={supplier.web}
                  placeholder='Enter your website'
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position='stacked'>Contact</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (supplier.contact = String(e.detail.value))
                  }
                  value={supplier.contact}
                  placeholder='Enter your contact'
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonItem>
            <IonButton onClick={save} color='success' fill='solid' slot='end'>
              <IonIcon icon={checkmark} />
              Guardar
            </IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SupplierEdit;
